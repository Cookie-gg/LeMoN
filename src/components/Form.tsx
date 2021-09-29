import axios from 'axios';
import { Link } from 'utils/next';
import { Button } from 'components';
import useForm from 'hooks/useForm';
import { memo, useState } from 'react';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/Form.module.scss';

const data = {
  name: {
    label: 'Name',
    placeholder: 'Your name',
    required: true,
  },
  email: {
    label: 'E-mail',
    placeholder: 'Your e-mail',
    required: true,
  },
  subject: {
    label: 'Subject',
    placeholder: 'Your subject',
    required: true,
  },
  message: {
    label: 'Message',
    placeholder: 'Your message',
    required: false,
  },
};

function Form({ className }: { className: string }) {
  const [formValue, _formValue] = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formState, _formState] = useState<'init' | 'yet' | 'sending' | 'error' | 'complete'>('init');
  const submit = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (formValue.name === '' || formValue.email === '' || formValue.subject === '') {
      alert('Required fields must not be empty.');
      return;
    }
    _formState('sending');
    await axios
      .post(`${process.env.NEXT_PUBLIC_MAILER}`, {
        name: formValue.name,
        email: formValue.email,
        subject: formValue.subject,
        message: formValue.message,
      })
      .then(() => {
        _formState('complete');
      })
      .catch(() => {
        _formState('error');
      });
  };
  return (
    <form className={`${styles.entire} ${className}`}>
      <div
        className={`${styles.inner} ${
          formState === 'yet' ? styles.visible : formState === 'init' ? styles.init : styles.hidden
        }`}
      >
        <label htmlFor="name">
          {data.name.label}
          {data.name.required && '*'}
        </label>
        <div className={styles.text}>
          <input
            name="name"
            type="text"
            placeholder={`${data.name.placeholder} ${data.name.required ? '(required)' : ''}`}
            value={formValue.name}
            onChange={(e) => _formValue(e)}
            required
          />
          <span className={styles.triangle}></span>
        </div>
        <label htmlFor="email">
          {data.email.label}
          {data.email.required && '*'}
        </label>
        <div className={styles.text}>
          <input
            name="email"
            type="text"
            placeholder={`${data.email.placeholder} ${data.email.required ? '(required)' : ''}`}
            value={formValue.email}
            onChange={(e) => _formValue(e)}
            required
          />
          <span className={styles.triangle}></span>
        </div>
        <label htmlFor="subject">
          {data.subject.label}
          {data.subject.required && '*'}
        </label>
        <div className={styles.text}>
          <input
            name="subject"
            type="text"
            placeholder={`${data.subject.placeholder} ${data.subject.required ? '(required)' : ''}`}
            value={formValue.subject}
            onChange={(e) => _formValue(e)}
            required
          />
          <span className={styles.triangle}></span>
        </div>
        <label htmlFor="message">
          {data.message.label}
          {data.message.required && '*'}
        </label>
        <div className={styles.text}>
          <textarea
            name="message"
            placeholder={`${data.message.placeholder} ${data.message.required ? '(required)' : ''}`}
            value={formValue.message}
            onChange={(e) => _formValue(e)}
            required
          />
          <span className={styles.triangle}></span>
        </div>
        <div className={styles.submit}>
          <input type="submit" value="Send" onClick={(e) => submit(e)} />
        </div>
      </div>
      <Iconify
        icon="eos-icons:loading"
        className={`${styles.sending} ${formState === 'sending' ? styles.visible : styles.hidden}`}
      />
      <div className={`${styles.error} ${formState === 'error' ? styles.visible : styles.hidden}`}>
        正常に送信されませんでした。 <br />
        もう一度入力・送信を行うか、
        <br />
        お手数をおかけしますが、
        <a href={`mailto:${'cookie.nkz@gmail.com'}`}>cookie.nkz@gmail.com</a> までご連絡ください。
        <Button className={styles.button}>
          <span
            onClick={(e) => {
              e.preventDefault();
              _formState('yet');
            }}
          >
            もう一度入力する
          </span>
        </Button>
      </div>
      <div className={`${styles.complete} ${formState === 'complete' ? styles.visible : styles.hidden}`}>
        お問い合わせありがとうございます。
        <br />
        念のため、ご入力されたメールが正しく送信されていることの確認をよろしくお願い致します。
        <Button className={styles.button}>
          <Link href="/">
            <a>ホームに戻る</a>
          </Link>
        </Button>
      </div>
    </form>
  );
}

export default memo(Form);
