import { memo } from 'react';
import { useEditorQuery } from 'types/graphql.d';
import styles from '../../assets/scss/components/editor/Topics.module.scss';

function Topics({ topics, dispatch }: { topics: string[]; dispatch: (arg: { name: string; value: string }) => void }) {
  const { data, loading } = useEditorQuery();
  return (
    <>
      {topics.map((_, i) => (
        <div className={styles.entire} key={i}>
          <>
            <select
              name="topics"
              className={`${topics[i] === '' && styles.init}`}
              onChange={(e) => {
                const changes: string[] = topics;
                changes[i] = e.target.value;
                dispatch({ name: e.target.name, value: JSON.stringify(changes) });
              }}
              value={topics[i]}
              required
            >
              <option value="">{loading ? 'loading...' : 'article topic'}</option>
              {data &&
                data.topics
                  .filter((value) => topics.filter((_value) => _value !== topics[i]).indexOf(value.name) === -1)
                  .map((topic, j) => (
                    <option value={topic.name} key={j}>
                      {topic.displayName}
                    </option>
                  ))}
            </select>
            {data &&
            topics.filter((value) => value === '').length < 1 &&
            i === topics.length - 1 &&
            topics.length !== data.topics.length ? (
              <button
                className={styles.add}
                onClick={(e) => {
                  e.preventDefault();
                  const changes: string[] = topics;
                  changes.push('');
                  dispatch({ name: 'topics', value: JSON.stringify(changes) });
                }}
              >
                <span>+</span>
              </button>
            ) : (
              topics.length !== 1 && (
                <button
                  className={styles.delete}
                  onClick={(e) => {
                    e.preventDefault();
                    const changes: string[] = topics;
                    changes.splice(i, 1);
                    dispatch({ name: 'topics', value: JSON.stringify(changes) });
                  }}
                >
                  <span>-</span>
                </button>
              )
            )}
          </>
        </div>
      ))}
    </>
  );
}

export default memo(Topics);
