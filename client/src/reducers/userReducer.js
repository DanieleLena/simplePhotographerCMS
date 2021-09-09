
import { LOGIN_SUCCESS,LOGIN_ERROR } from "../actions";


const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
     const {token,user} = action.payload;
      return { ...state,isLogIn: true, user:{name:user.name,token:token} };
    case LOGIN_ERROR:
      console.log("ciao");
      return { ...state };
    default:
      return { ...state };
  }
};

export default userReducer;
