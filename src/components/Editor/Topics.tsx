import { IconPicker } from 'components';
import { memo, useState, Fragment, useEffect } from 'react';
import { useFindAllOnlyTopicsQuery } from 'types/graphql.d';
import styles from '../../assets/scss/components/editor/Topics.module.scss';

function Topics({ topics, dispatch }: { topics: string[]; dispatch: (arg: { name: string; value: string }) => void }) {
  const { data, loading, error } = useFindAllOnlyTopicsQuery();
  const [allTopics, _allTopics] = useState<{ name: string; displayName: string }[]>([]);
  useEffect(() => data && _allTopics(data.topics), [data]);
  const [topicEditor, _topicEditor] = useState<{ index: number; enable: boolean }>({ index: -1, enable: false });
  return (
    <>
      {topics.map((_, i) => (
        <Fragment key={i}>
          <div className={styles.entire}>
            <select
              name="topics"
              className={`${topics[i] === '' && styles.init}`}
              onChange={(e) => {
                _topicEditor({ index: i, enable: e.target.value === 'editing' });
                const changes = topics;
                changes[i] = e.target.value;
                dispatch({ name: e.target.name, value: JSON.stringify(changes) });
              }}
              value={topics[i]}
              required
            >
              <option value="">{loading ? 'loading...' : error ? error.name : 'article topic'}</option>
              {data &&
                allTopics
                  .filter((value) => topics.filter((_value) => _value !== topics[i]).indexOf(value.name) === -1)
                  .map((topic, j) => (
                    <option value={topic.name} key={`${i}_${j}`}>
                      {topic.displayName}
                    </option>
                  ))}
              <option value="editing">Add a topic</option>
            </select>
            {data &&
            topics.filter((value) => value === '').length < 1 &&
            i === topics.length - 1 &&
            topics.length !== allTopics.length &&
            topics[i] !== 'editing' ? (
              <button
                className={styles.add}
                onClick={(e) => {
                  e.preventDefault();
                  const changes = topics;
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
                    _topicEditor({ index: i, enable: false });
                    const changes = topics;
                    changes.splice(i, 1);
                    dispatch({ name: 'topics', value: JSON.stringify(changes) });
                  }}
                >
                  <span>-</span>
                </button>
              )
            )}
          </div>
          {data && topicEditor.index === i && topicEditor.enable && (
            <IconPicker
              className={styles.picker}
              onSelect={(arg) => {
                // disable icon picker
                _topicEditor({ index: -1, enable: false });
                // add as a topic of the article
                dispatch({
                  name: 'topics',
                  value: JSON.stringify(topics.map((t) => (t === 'editing' ? arg.toLowerCase() : t))),
                });
                // add as a option and sort
                _allTopics((prev) =>
                  [...prev, { name: arg.toLowerCase(), displayName: arg }]
                    .slice()
                    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)),
                );
              }}
            />
          )}
        </Fragment>
      ))}
    </>
  );
}

export default memo(Topics);
