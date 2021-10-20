import useForm from 'hooks/useForm';
import { useRouter } from 'utils/next';
import pages from '../assets/scss/pages/Login.module.scss';
import React, { FormEvent, Fragment as _, memo, useCallback, useEffect } from 'react';
import { FormFrame, FormInput, FormLabel, FormSubmit, HeadMeta, Img, PageFrame } from 'components';

// from data-base
import Lemon from 'assets/img/lemon.svg';
const formData = [
  {
    name: 'name',
    lable: 'Name',
    required: true,
    placeholder: 'Your name',
  },
  {
    name: 'password',
    lable: 'Password',
    required: true,
    placeholder: 'Your password',
  },
];

function Page({ auth }: { auth: { state: boolean; login: (name: string, password: string) => void } }) {
  const router = useRouter();
  const [form, _form] = useForm({ name: '', password: '' });
  const loginHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      auth.login(form.name, form.password);
    },
    [auth, form],
  );
  useEffect(() => {
    auth.state && router.push('/admin');
  }, [auth.state, router]);
  return (
    <>
      <HeadMeta title="Login" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Login`} />
      <PageFrame classNmae={pages.entire}>
        <FormFrame className={pages.form} onSubmit={async (e) => loginHandler(e)}>
          <Img src={Lemon.src} alt="site_logo" className={pages.logo} width={1614} height={1722} loading="lazy" />
          <h1>
            <span>LeMoN</span>
          </h1>
          <>
            {formData.map((value, i) => (
              <_ key={i}>
                <FormLabel htmlFor={value.name} text={value.lable} required={value.required} />
                <FormInput
                  name={value.name}
                  value={form[value.name as keyof typeof form]}
                  required={value.required}
                  onChange={(e) => _form(e)}
                  placeholder={`${value.placeholder} ${value.required ? '(required)' : ''}`}
                />
              </_>
            ))}
          </>
          <FormSubmit value="Login" />
          <div className={pages.divider}>or</div>
          <FormSubmit value="Login as a guest" preventSubmit onClick={() => router.push('/admin')} />
        </FormFrame>
      </PageFrame>
    </>
  );
}

export default memo(Page, (prev, next) => prev.auth == next.auth);
