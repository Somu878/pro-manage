import axiosClient from "./AxiosClient";
const userApi = {
  verifyToken: () => axiosClient.get("auth/data"),
};

export default userApi;
