import { Icon as Iconify } from '@iconify/react';
import { Button } from 'components';
import { memo } from 'react';
import { Link } from 'utils/next';
import styles from '../assets/scss/components/FormState.module.scss';

function FormState({
  formState,
  _formState,
}: {
  formState: 'yet' | 'sending' | 'error' | 'complete';
  _formState: (arg: typeof formState) => void;
}) {
  return (
    <>
      <Iconify
        icon="eos-icons:loading"
        className={`${styles.state} ${styles.sending} ${formState === 'sending' ? styles.visible : styles.hidden}`}
      />
      <div className={`${styles.state} ${styles.error} ${formState === 'error' ? styles.visible : styles.hidden}`}>
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
      <div
        className={`${styles.state} ${styles.complete} ${formState === 'complete' ? styles.visible : styles.hidden}`}
      >
        お問い合わせありがとうございます。
        <br />
        念のため、ご入力されたメールが正しく送信されていることの確認をよろしくお願い致します。
        <Button className={styles.button}>
          <Link href="/">
            <a>ホームに戻る</a>
          </Link>
        </Button>
      </div>
    </>
  );
}

export default memo(FormState);
