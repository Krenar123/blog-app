import {
    CREATE_COMMENT,
    RETRIEVE_COMMENTS,
    UPDATE_COMMENT,
    DELETE_COMMENT
  } from "./types";
  
  import CommentDataService from "../services/comment.service";
  
  export const createComment = (content, commentable_id, commentable_type, user_id) => async (dispatch) => {
    try {
      const res = await CommentDataService.create({ content, commentable_id, commentable_type, user_id});
  
      dispatch({
        type: CREATE_COMMENT,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveComments = () => async (dispatch) => {
    try {
      const res = await CommentDataService.getAll();
  
      dispatch({
        type: RETRIEVE_COMMENTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateComment = (id, data) => async (dispatch) => {
    try {
      const res = await CommentDataService.update(id, data);
  
      dispatch({
        type: UPDATE_COMMENT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteComment = (id) => async (dispatch) => {
    try {
      await CommentDataService.delete(id);
  
      dispatch({
        type: DELETE_COMMENT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  