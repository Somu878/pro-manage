// import axiosClient from "./AxiosClient";

// const AuthApi = {
//   login: (params) => axiosClient.post("auth/login", params),
// };
// export default AuthApi;
import axios from "axios";

export async function LoginUser(email, password) {
  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const payLoad = { email, password };
  try {
    const response = await axios.post(`${baseURL}auth/login`, payLoad, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function RegisterUser(name, email, password) {
  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const payLoad = { name, email, password };
  try {
    const response = await axios.post(`${baseURL}auth/register`, payLoad, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
