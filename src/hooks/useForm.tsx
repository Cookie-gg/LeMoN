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
    } else {
      const { name, value } = e.target;
      dispatch({ name, value });
    }
  }
  const reset = () => Object.keys(state).forEach((value) => dispatch({ name: value, value: '' }));
  return [state, asyncReducer, dispatch, reset];
}
export default useForm;
