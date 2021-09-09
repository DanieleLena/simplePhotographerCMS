
import { LOGIN_SUCCESS,LOGIN_ERROR,LOGOUT } from "../actions";


const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { token, user } = action.payload;
      return {
        ...state,
        isLogIn: true,
        user: { name: user.name, token: token },
      };

    case LOGIN_ERROR:
      console.log("ciao");
      return { ...state };
    case LOGOUT:
          localStorage.removeItem("user");
             
      return { ...state, isLogIn: false, user: {} };
    default:
      return { ...state };
  }
};

export default userReducer;
