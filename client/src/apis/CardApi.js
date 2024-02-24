import axiosClient from "./AxiosClient";

const cardApi = {
  get: (cardId) => axiosClient.get(`board/${cardId}`),
};

export default cardApi;
