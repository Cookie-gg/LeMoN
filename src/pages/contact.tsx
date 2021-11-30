import axios from 'axios';
import { useForm } from 'hooks';
import { Image } from 'utils/next';
import contact from 'assets/json/contact.json';
import { FormEvent, Fragment as _, useState } from 'react';
import addressDelivery from 'assets/svg/addressDelivery.svg';
import styles from '../assets/scss/pages/Contact.module.scss';
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

export default function Page() {
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
        `${process.env.NEXT_PUBLIC_MELON}/mail`,
        {
          name: formValue.name,
          email: formValue.email,
          subject: formValue.subject,
          message: formValue.message,
        },
        { headers: { authorization: `${process.env.NEXT_PUBLIC_MAILER_KEY}` } },
      )
      .then(() => {
        _formState('complete');
      })
      .catch(() => {
        _formState('error');
      });
    return false;
  };
  return (
    <>
      <HeadMeta title={contact.title} ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/${contact.title}`} />
      <PageFrame classNmae={styles.page}>
        <>
          <div className={styles.text_wrapper}>
            <Heading rank={2} text={contact.form.title} className={styles.heading} />
            <FormFrame className={styles.form} onSubmit={async (e) => submit(e)}>
              <div className={`${styles.inner} ${formState === 'yet' ? styles.visible : styles.hidden}`}>
                {contact.form.display.map((value, i) => (
                  <_ key={i}>
                    <FormLabel htmlFor={value.name} required={value.required} text={value.lable} />
                    <FormInput
                      name={value.name}
                      value={formValue[value.name as keyof typeof formValue]}
                      required={value.required}
                      onChange={(e) => _formValue(e)}
                      placeholder={`${value.placeholder} ${value.required ? contact.form.placeholder : ''}`}
                    />
                  </_>
                ))}
                <FormSubmit value={contact.form.submit} />
              </div>
              <FormState formState={formState} _formState={(arg: typeof formState) => _formState(arg)} />
            </FormFrame>
          </div>
          <ImageFrame className={styles.image_frame}>
            <Image
              src={addressDelivery}
              alt={`${contact.form.title.toLowerCase()}_featured_image`}
              width={913}
              height={680}
              loading="lazy"
            />
          </ImageFrame>
        </>
      </PageFrame>
    </>
  );
}
