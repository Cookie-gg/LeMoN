import { memo } from 'react';
import { Loading } from 'components';
import { client } from 'graphql/config.gql';
import { Icon as Iconify } from '@iconify/react';
import { useAxios, useForm, usePeriod } from 'hooks';
import { TopicInput, CreateTopicDocument } from 'types/graphql.d';
import styles from 'assets/scss/components/IconPicker.module.scss';

function IconPicker({ className, onSelect }: { className?: string; onSelect: (topic: string) => void }) {
  const [timeout, _timeout] = usePeriod<'normal' | 'error' | 'empty'>('normal');
  const [topic, _topic, dispatch, resetAll] = useForm({ name: '', iconIndex: '', icon: '' });
  const [{ loading, data, error }, _data] = useAxios<{ name: string; code: string; icons: string[] }[]>(
    `${process.env.NEXT_PUBLIC_MELON}/icon?search=`,
    process.env.NEXT_PUBLIC_ICON_KEY,
    { timeout: true },
  );
  return (
    <>
      <div className={`${styles.wrapper} ${className}`}>
        <input
          type="text"
          name="name"
          required
          autoComplete="off"
          value={topic.name}
          placeholder={timeout === 'normal' ? 'topic name' : timeout === 'empty' ? 'empty not accept' : 'sending error'}
          className={`${topic.name.length > 0 && 'alignment'}`}
          onChange={(e) => {
            _topic(e);
            _data && _data({ query: topic.name });
          }}
        />
        <Iconify
          fr={''}
          icon="bx:bx-caret-right-circle"
          onClick={async () => {
            if (topic.name.length > 0) {
              try {
                await client.mutate<TopicInput>({
                  mutation: CreateTopicDocument,
                  variables: { name: topic.name.toLowerCase(), displayName: topic.name, icon: topic.icon },
                });
                resetAll();
                onSelect(topic.name);
              } catch (error) {
                _timeout('error', 2000);
              }
            } else _timeout('empty', 2000);
          }}
        />
      </div>
      {topic.name.length > 0 && (
        <div className={`${styles.entire} ${className}`}>
          <div className={styles.icons}>
            {loading && <Loading />}
            {error && <p>{`${error.name}: ${error.message}`}</p>}
            <ul>
              {data &&
                data.map((colle, i) =>
                  colle.icons.map((icon, j) => (
                    <li
                      key={`${i}_${j}`}
                      title={`${colle.code}:${icon}`}
                      className={`${topic.iconIndex === `${i}_${j}` && styles.active}`}
                      onClick={() => {
                        dispatch({ name: 'iconIndex', value: `${i}_${j}` });
                        dispatch({ name: 'icon', value: `${colle.code}:${icon}` });
                      }}
                    >
                      <Iconify fr={''} icon={`${colle.code}:${icon}`} />
                    </li>
                  )),
                )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(IconPicker);
