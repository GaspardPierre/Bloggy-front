// Requêtes Comment

import api from "../api";

export const addCommentAPI = async (member_id, author, card_id, content) => {
  return await api.post("/api/comment/addComment", {
    member_id,
    author,
    card_id,
    content,
  });
};

export const updateCommentAPI = async (commentId, content) => {
  return await api.patch(`/api/comment/${commentId}`, { content });
};

export const deleteCommentAPI = async (commentId) => {
  return await api.delete(`/comment/${commentId}`);
};
