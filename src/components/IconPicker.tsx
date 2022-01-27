import { memo, useEffect, useRef } from 'react';
import { Loading } from 'components';
import { client } from 'graphql/config.gql';
import { Icon as Iconify } from '@iconify/react';
import { useAxios, useForm, useIntersect, usePeriod } from 'hooks';
import { TopicInput, CreateTopicDocument } from 'types/graphql.d';
import styles from '../assets/scss/components/IconPicker.module.scss';

function IconPicker({ className, onSelect }: { className?: string; onSelect: (topic: string) => void }) {
  const [timeout, _timeout] = usePeriod<'normal' | 'error' | 'empty'>('normal');
  const [topic, _topic, dispatch, resetAll] = useForm({ name: '', iconIndex: '', icon: '' });
  const [{ loading, data, error, limit }, lazyDispatch, timeoutDispatch] = useAxios<string[]>(
    `${process.env.NEXT_PUBLIC_MELON}/icon`,
    { headers: { key: `${process.env.NEXT_PUBLIC_ICON_KEY}` } },
    { timeout: true, lazy: true },
  );
  const wrapper = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLLIElement>(null);
  const observer = useIntersect({ root: wrapper.current, el: target.current });
  useEffect(() => {
    (async () => {
      if (data && Object.keys(data).length > 53 && observer.intersect) {
        await lazyDispatch({ query: { search: topic.name, limit: 54, index: Object.keys(data).length } });
        limit && Object.keys(data).length === limit && observer.disable(false);
      }
    })();
    // eslint-disable-next-line
  }, [data, topic.name, observer.intersect]);
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
            // search after it spend 1.5s
            timeoutDispatch({ reset: true, query: { search: e.target.value, limit: 54, index: 0 } });
          }}
        />
        <Iconify
          fr={''}
          icon="bx:bx-caret-right-circle"
          onClick={async () => {
            if (topic.name.length > 0) {
              try {
                // add to the database as a topic object
                await client.mutate<TopicInput>({
                  mutation: CreateTopicDocument,
                  variables: { name: topic.name.toLowerCase(), displayName: topic.name, icon: topic.icon },
                });
                // clear input
                resetAll();
                // add to the article
                onSelect(topic.name);
              } catch (error) {
                // in case of catching error on adding topic to the datbase or the article
                _timeout('error', 2000);
              }
            } else _timeout('empty', 2000); /// in case of empty input
          }}
        />
      </div>
      {topic.name.length > 0 && (
        <div className={`${styles.entire} ${className}`}>
          <div className={styles.icons} ref={wrapper}>
            <ul>
              {topic.icon !== '' && (
                <li title={topic.icon} className={styles.active}>
                  <Iconify fr={''} icon={topic.icon} />
                </li>
              )}
              {data && (
                <>
                  {Object.values(data).map((icon, i) => (
                    <li
                      key={i}
                      title={icon}
                      className={`${topic.iconIndex === `${i}` && styles.active}`}
                      onClick={() => {
                        dispatch({ name: 'iconIndex', value: `${i}` });
                        dispatch({ name: 'icon', value: icon });
                      }}
                    >
                      <Iconify fr={''} icon={icon} />
                    </li>
                  ))}
                  {Object.keys(data).length < 1 && <p>Not found.</p>}
                </>
              )}
              <li ref={target} />
            </ul>
            {loading && <Loading className={`${data && styles.loading}`} />}
            {error && <p>{`${error.name}: ${error.message}`}</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default memo(IconPicker);
