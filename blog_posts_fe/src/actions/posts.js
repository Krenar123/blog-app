import {
  CREATE_POST,
  RETRIEVE_POSTS,
  UPDATE_POST,
  DELETE_POST,
  DELETE_ALL_POSTS
} from "./types";

import PostDataService from "../services/post.service";

export const createPost = (content, user_id) => async (dispatch) => {
  try {
    const res = await PostDataService.create({ content, user_id: 1 });

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrievePosts = () => async (dispatch) => {
  try {
    const res = await PostDataService.getAll();

    dispatch({
      type: RETRIEVE_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, data) => async (dispatch) => {
  try {
    const res = await PostDataService.update(id, data);

    dispatch({
      type: UPDATE_POST,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await PostDataService.delete(id);

    dispatch({
      type: DELETE_POST,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllPosts = () => async (dispatch) => {
  try {
    const res = await PostDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_POSTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findPostsByContent = (content) => async (dispatch) => {
  try {
    const res = await PostDataService.findByContent(content);

    dispatch({
      type: RETRIEVE_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};