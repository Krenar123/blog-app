import {
  CREATE_POST,
  RETRIEVE_POSTS,
  UPDATE_POST,
  DELETE_POST,
  DELETE_ALL_POSTS,
} from "../actions/types";

const initialState = [];

function postReducer(posts = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_POST:
      return [...posts, payload];

    case RETRIEVE_POSTS:
      return payload;

    case UPDATE_POST:
      return posts.map((post) => {
        if (post.id === payload.id) {
          return {
            ...post,
            ...payload,
          };
        } else {
          return post;
        }
      });

    case DELETE_POST:
      return posts.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_POSTS:
      return [];

    default:
      return posts;
  }
};

export default postReducer;