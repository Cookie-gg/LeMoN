import useForm from 'hooks/useForm';
import lemon from 'assets/svg/lemon.svg';
import json from 'assets/json/login.json';
import { GetServerSideProps } from 'utils/next';
import styles from '../assets/scss/pages/Login.module.scss';
import React, { FormEvent, Fragment as _, memo, useCallback } from 'react';
import { FormFrame, FormInput, FormLabel, FormSubmit, HeadMeta, Img, PageFrame } from 'components';
import { auth, cookie } from 'utils/common';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await auth('get', '/status', cookie(ctx.req.headers.cookie).token);
    return { redirect: { destination: '/', permanent: false } };
  } catch {
    return { props: {} };
  }
};

function Page({ auth }: { auth: { state: boolean; login: (name: string, password: string) => Promise<void> } }) {
  const [form, _form] = useForm({ name: '', password: '' });
  const loginHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      auth.login(form.name, form.password);
    },
    [auth, form],
  );
  return (
    <>
      <HeadMeta title={json.title} />
      <PageFrame className={styles.page}>
        <FormFrame className={styles.form} onSubmit={async (e) => loginHandler(e)}>
          <Img src={lemon.src} alt="site_logo" className={styles.logo} width={1614} height={1722} loading="lazy" />
          <h1>
            <span>{json.form.title}</span>
          </h1>
          <>
            {json.form.display.map((value, i) => (
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
          <FormSubmit value={json.form.submit[0]} />
          {/* <div className={styles.divider}>or</div> */}
          {/* <FormSubmit value={json.form.submit[0]} preventSubmit onClick={() => router.push('/admin')} /> */}
        </FormFrame>
      </PageFrame>
    </>
  );
}

export default memo(Page, (prev, next) => prev.auth == next.auth);
