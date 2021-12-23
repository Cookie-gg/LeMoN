import { displayDate, encodeImg } from 'utils/common';
import { useReducer, ChangeEvent, Dispatch } from 'react';

function useForm<T>(
  initialState: T,
): [
  T,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => Promise<void>,
  Dispatch<{ name: string; value: string }>,
  () => void,
] {
  function reducer(currents: T, update: { name: string; value: string }): T {
    // support array or object
    if (update.value.match(/^((\[|\{).*?(\]|\})|true|false)/))
      return { ...currents, ...{ [update.name]: JSON.parse(update.value) } };
    else return { ...currents, ...{ [update.name]: update.value } };
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  async function asyncReducer(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): Promise<void> {
    if ((e.target as HTMLInputElement).files) {
      const { name, files } = e.target as HTMLInputElement;
      const encodedFile = await encodeImg(files![0]);
      dispatch({ name: name, value: `${encodedFile}` });
    } else if (e.target.type === 'radio') {
      dispatch({ name: e.target.name, value: e.target.defaultValue });
    } else if (e.target.type === 'date') {
      const date = new Date((e.target as HTMLInputElement).valueAsNumber);
      dispatch({ name: e.target.name, value: displayDate(date, '-', false) });
    } else {
      dispatch({ name: e.target.name, value: e.target.value });
    }
  }
  const reset = () => Object.keys(state).forEach((value) => dispatch({ name: value, value: '' }));
  return [state, asyncReducer, dispatch, reset];
}
export default useForm;
