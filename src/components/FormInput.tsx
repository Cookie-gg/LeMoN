import { ChangeEvent, memo } from 'react';
import styles from '../assets/scss/components/FormInput.module.scss';

const inputType = [
  'hidden',
  'text',
  'search',
  'tel',
  'url',
  'email',
  'password',
  'datetime',
  'date',
  'month',
  'week',
  'time',
  'week',
  'time',
  'datetime-local',
  'number',
  'range',
  'color',
  'checkbox',
  'radio',
  'file',
  'submit',
  'reset',
  'button',
];

function FormInput({
  name,
  placeholder,
  value,
  onChange,
  required,
}: {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
}) {
  return (
    <div className={styles.entire}>
      {name.includes('message') || name.includes('textarea') ? (
        <textarea
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        />
      ) : (
        <input
          name={name}
          value={value}
          autoComplete="on"
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          type={inputType.find((input) => input === name) || 'text'}
        />
      )}
      <span className={styles.triangle}></span>
    </div>
  );
}

export default memo(FormInput, (prev, next) => prev.value === next.value);
