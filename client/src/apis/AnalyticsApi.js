import axios from "axios";
const getToken = () => localStorage.getItem("token");

export async function AnalyticsData(name, oldPassword, newPassword) {
  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  try {
    const response = await axios.get(`${baseURL}board/analytics`, {
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
