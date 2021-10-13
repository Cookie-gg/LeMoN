import axios from 'axios';
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

function Login({ auth }: { auth: { state: boolean; set: (args: boolean) => void; refresh: () => void } }) {
  const router = useRouter();
  const [formValue, _formValue] = useForm({ name: '', password: '' });
  const loginHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios
        .post(
          `${process.env.NEXT_PUBLIC_AUTH}/login`,
          { username: formValue.name, password: formValue.password },
          { headers: { key: process.env.NEXT_PUBLIC_AUTH_KEY } },
        )
        .then((res) => {
          sessionStorage.setItem('access_token', res.data.token);
          auth.set(true);
          auth.refresh();
          router.push('/admin');
        })
        .catch(() => alert('名前、またはパスワードが間違っています'));
    },
    [formValue, router, auth],
  );
  useEffect(() => {
    auth.state && router.push('/admin');
  }, [auth.state, router]);
  return (
    <>
      <HeadMeta title="Login" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Login`} />
      <PageFrame classNmae={pages.entire}>
        <FormFrame className={pages.form} onSubmit={(e) => loginHandler(e)}>
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
                  value={formValue[value.name as keyof typeof formValue]}
                  required={value.required}
                  onChange={(e) => _formValue(e)}
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

export default memo(Login, (prev, next) => prev.auth == next.auth);
