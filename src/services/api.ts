import Axios from 'axios';

export const api = Axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})