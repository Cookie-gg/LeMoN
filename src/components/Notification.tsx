import { memo, useEffect, useRef } from 'react';
import styles from '../assets/scss/components/Notification.module.scss';

function Notification({
  noti,
  dispatch,
}: {
  noti: { msg: string; enable: boolean };
  dispatch: (state: boolean) => void;
}) {
  const cardTimeout = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (noti.enable) {
      cardTimeout.current && clearTimeout(cardTimeout.current);
      cardTimeout.current = setTimeout(() => dispatch(false), 3000);
    }
  }, [noti.enable, dispatch]);
  return (
    <div className={`${styles.entire} ${noti.enable && styles.enable}`}>
      <div className={styles.card}>
        <span
          onClick={() => {
            cardTimeout.current && clearTimeout(cardTimeout.current);
            dispatch(false);
          }}
        >
          ×
        </span>
        <span>{noti.msg}</span>
      </div>
    </div>
  );
}

export default memo(Notification);
