import axios from 'axios';
import {url} from './helpers';
axios.defaults.baseURL = url;

axios.interceptors.request.use(function (req) {
  const user = localStorage.getItem('user');

  if (user) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    req.headers.authorization = `Bearer ${token}`;

    return req;
  }
  return req;
});
