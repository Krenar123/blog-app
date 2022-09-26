import {
    CREATE_REPLY,
    RETRIEVE_REPLIES,
    UPDATE_REPLY,
    DELETE_REPLY
  } from "./types";
  
  import ReplyDataService from "../services/reply.service";
  
  export const createReply = (content, commentable_id, commentable_type, user_id) => async (dispatch) => {
    try {
      const res = await ReplyDataService.create({ content, commentable_id, commentable_type, user_id});
  
      dispatch({
        type: CREATE_REPLY,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveReplies = () => async (dispatch) => {
    try {
      const res = await ReplyDataService.getAll();
  
      dispatch({
        type: RETRIEVE_REPLIES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateReply = (id, data) => async (dispatch) => {
    try {
      const res = await ReplyDataService.update(id, data);
  
      dispatch({
        type: UPDATE_REPLY,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteReply = (id) => async (dispatch) => {
    try {
      await ReplyDataService.delete(id);
  
      dispatch({
        type: DELETE_REPLY,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  