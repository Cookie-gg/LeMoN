import { useReducer } from 'react';
import { encodeImg } from 'utils/common';

function useForm<T>( // 呼び出し側の型に依存
  initialState: T,
): [T, (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => Promise<void>] {
  function reducer(currents: T, updates: { name: string; value: string }): T {
    return { ...currents, ...{ [updates.name]: updates.value } };
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  async function asyncReducer(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): Promise<void> {
    if ((e.target as HTMLInputElement).files) {
      const { name, files } = e.target as HTMLInputElement;
      const encodedFile = await encodeImg(files![0]);
      dispatch({ name: name, value: encodedFile as string });
    } else {
      const { name, value } = e.target;
      dispatch({ name, value });
    }
  }
  return [state, asyncReducer];
}
export default useForm;
