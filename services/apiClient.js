import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://api.spacexdata.com/v4/'
});

export default {
  get (url) {
    return apiClient.get(url);
  },
  post (url, payload) {
    return apiClient.post(url, payload);
  }
  // other methods here
};