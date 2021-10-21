import { encodeImg } from 'utils/common';
import { useReducer, ChangeEvent, Dispatch } from 'react';

function useForm<T>(
  initialState: T,
): [
  T,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => Promise<void>,
  Dispatch<{ name: string; value: string }>,
  () => void,
] {
  // 呼び出し側の型に依存
  function reducer(currents: T, updates: { name: string; value: string }): T {
    return { ...currents, ...{ [updates.name]: updates.value } };
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  async function asyncReducer(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): Promise<void> {
    if ((e.target as HTMLInputElement).files) {
      const { name, files } = e.target as HTMLInputElement;
      const encodedFile = await encodeImg(files![0]);
      dispatch({ name: name, value: encodedFile as string });
    } else if (e.target.type === 'radio') {
      dispatch({ name: e.target.name, value: e.target.defaultValue });
    } else if (e.target.type === 'date') {
      const date = new Date((e.target as HTMLInputElement).valueAsNumber);
      dispatch({
        name: e.target.name,
        value: `${date.getFullYear()}-${('0' + String(date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(
          -2,
        )}`,
      });
    } else {
      dispatch({ name: e.target.name, value: e.target.value });
    }
  }
  const reset = () => Object.keys(state).forEach((value) => dispatch({ name: value, value: '' }));
  return [state, asyncReducer, dispatch, reset];
}
export default useForm;
