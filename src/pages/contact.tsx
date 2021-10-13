import axios from 'axios';
import { useForm } from 'hooks';
import { FormEvent, Fragment as _, useState } from 'react';
import { GetStaticProps, Image } from 'utils/next';
import pages from '../assets/scss/pages/Contact.module.scss';
import contactQuery, { ContactQueryType } from 'data/contactQuery';
import {
  Heading,
  HeadMeta,
  ImageFrame,
  PageFrame,
  FormLabel,
  FormState,
  FormSubmit,
  FormInput,
  FormFrame,
} from 'components';

export const getStaticProps: GetStaticProps = async () => ({
  props: { data: JSON.stringify(await contactQuery()) },
  revalidate: 60,
});

const formData = [
  {
    name: 'name',
    lable: 'Name',
    placeholder: 'Your name',
    required: true,
  },
  {
    name: 'email',
    lable: 'E-mail',
    placeholder: 'Your e-mail',
    required: true,
  },
  {
    name: 'subject',
    lable: 'Subject',
    placeholder: 'Your subject',
    required: true,
  },
  {
    name: 'message',
    lable: 'Message',
    placeholder: 'Your message',
    required: false,
  },
];

export default function Contact({ data }: { data: ContactQueryType }) {
  data = JSON.parse(String(data));
  const [formValue, _formValue] = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formState, _formState] = useState<'yet' | 'sending' | 'error' | 'complete'>('yet');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    _formState('sending');
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_MAILER}`,
        {
          name: formValue.name,
          email: formValue.email,
          subject: formValue.subject,
          message: formValue.message,
        },
        { headers: { authorization: process.env.NEXT_PUBLIC_MAILER_KEY } },
      )
      .then(() => {
        _formState('complete');
      })
      .catch(() => {
        _formState('error');
      });
    return false;
  };
  const FeaturedImage = ({ className }: { className: string }) => (
    <ImageFrame className={`${pages.image_frame} ${className}`}>
      <Image
        src={data.form.addressDelivery}
        alt={`${data.form.title.toLowerCase()}_featured_image`}
        width={913}
        height={680}
        loading="lazy"
        lazyBoundary="819"
      />
    </ImageFrame>
  );
  return (
    <>
      <HeadMeta title="Contact" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Contact`} />
      <PageFrame classNmae={pages.contact}>
        <>
          <div className={pages.text_wrapper}>
            <Heading rank={2} text={data.form.title} className={pages.heading} />
            <FeaturedImage className="sp" />
            <FormFrame className={pages.form} onSubmit={async (e) => submit(e)}>
              <div className={`${pages.inner} ${formState === 'yet' ? pages.visible : pages.hidden}`}>
                {formData.map((value, i) => (
                  <_ key={i}>
                    <FormLabel htmlFor={value.name} required={value.required} text={value.lable} />
                    <FormInput
                      name={value.name}
                      value={formValue[value.name as keyof typeof formValue]}
                      required={value.required}
                      onChange={(e) => _formValue(e)}
                      placeholder={`${value.placeholder} ${value.required ? '(required)' : ''}`}
                    />
                  </_>
                ))}
                <FormSubmit value="Send" />
              </div>
              <FormState formState={formState} _formState={(arg: typeof formState) => _formState(arg)} />
            </FormFrame>
          </div>
          <FeaturedImage className="pc" />
        </>
      </PageFrame>
    </>
  );
}
