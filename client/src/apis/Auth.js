import axios from "axios";

export async function LoginUser(email, password) {
  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const payLoad = { email, password };
  try {
    const response = await axios.post(`${baseURL}user/login`, payLoad, {
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
    const response = await axios.post(`${baseURL}user/register`, payLoad, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
