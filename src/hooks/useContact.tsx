import axios from 'axios';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import useForm from './useForm';

const useContact = (): [
  { [key: string]: string },
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => Promise<void>,
  'init' | 'yet' | 'sending' | 'error' | 'complete',
  Dispatch<SetStateAction<'init' | 'yet' | 'sending' | 'error' | 'complete'>>,
  (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => Promise<void>,
] => {
  const [formValue, _formValue] = useForm<{ [key: string]: string }>({
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
  };
  return [formValue, _formValue, formState, _formState, submit];
};

export default useContact;
