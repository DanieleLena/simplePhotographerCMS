const UPLOAD = "login";

const uploadReducer = (state ={}, action) => {
  switch (action.type) {
    case UPLOAD:
      return {...state};
    default:
      return { ...state };
  }
};

export default uploadReducer;
