import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-a274a.firebaseio.com/"
});

export default instance;
