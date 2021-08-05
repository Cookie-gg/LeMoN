import { Dispatch, useReducer } from 'react';
function useForm<T>(initialState: T): [T, Dispatch<InputTypes>] {
  function reducer(state: T, e: InputTypes): T {
    const { name, value } = e.target;
    return { ...state, ...{ [name]: value } };
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
export default useForm;
