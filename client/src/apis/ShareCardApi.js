import axiosClient from "./AxiosClient";
const sharecard = {
  getCard: (cardId) => axiosClient.get(`board/${cardId}`),
};
export default sharecard;
