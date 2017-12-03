// ***** ACTION TYPES *****
export const SET_ACTIVE_POST = 'SET_ACTIVE_POST';

// ***** ACTION CREATORS *****
export const setActivePost = post => ({ type: SET_ACTIVE_POST, postId: post.id })
