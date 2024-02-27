import axiosClient from "./AxiosClient";
const userApi = {
  getUserData: () => axiosClient.get("auth/data"),
};

export default userApi;
