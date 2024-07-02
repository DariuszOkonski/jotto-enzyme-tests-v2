import axios from 'axios';

export const getSecretWord = () => {
  // TODO: write actual action in Redux / context sections
  return axios.get('http://localhsot:3030').then((response) => response.data);
};
