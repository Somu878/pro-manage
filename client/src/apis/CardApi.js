import axiosClient from "./AxiosClient";

const cardApi = {
  getCard: (cardId) => axiosClient.get(`board/${cardId}`),
  getCards: (datePreference, status) =>
    axiosClient.get(`board/all/${datePreference}/${status}`),
  updateCard: (cardId, params) =>
    axiosClient.patch(`board/update/${cardId}`, params),
  addCard: (params) => axiosClient.post("board/add", params),
  deletecard: (cardId) => axiosClient.delete(`board/delete/${cardId}`),
};

export default cardApi;
