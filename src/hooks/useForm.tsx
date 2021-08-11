import { Dispatch, useReducer } from 'react';
function useForm<T extends { fileList?: FileList | null }>(
  initialState: T,
): [T, Dispatch<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>] {
  function reducer(state: T, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): T {
    if ((e.target as HTMLInputElement).files) {
      return { ...state, fileList: (e.target as HTMLInputElement).files };
    } else {
      const { name, value } = e.target;
      return { ...state, ...{ [name]: value } };
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
export default useForm;
