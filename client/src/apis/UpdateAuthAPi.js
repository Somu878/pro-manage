import axios from "axios";
const getToken = () => localStorage.getItem("token");

export async function updateUser(name, oldPassword, newPassword) {
  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const payLoad = {
    name,
    oldPassword,
    newPassword,
  };
  try {
    const response = await axios.patch(`${baseURL}auth/update`, payLoad, {
      withCredentials: true,
      headers: {
        token: getToken(),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
