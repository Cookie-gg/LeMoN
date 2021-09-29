import { Link } from 'utils/next';
import { Button } from 'components';
import useForm from 'hooks/useForm';
import { memo, useState } from 'react';
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

function Form({ className }: { className: string[] }) {
  const [formValue, _formValue] = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSent, _isSent] = useState(false);
  const submit = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (formValue.name === '' || formValue.email === '' || formValue.subject === '') {
      alert('Required fields must not be empty.');
      return;
    }
    
    _isSent(true);
  };
  return (
    <form className={`${className[0]} ${styles.entire} ${isSent && className[1]}`}>
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
      <div className={`${styles.thanks} ${className[2]}`}>
        Thank you for sending.
        <br />
        Check the confirmation email.
        <Button className={styles.button}>
          <Link href="/">
            <a>Back to Home</a>
          </Link>
        </Button>
      </div>
    </form>
  );
}

export default memo(Form);
