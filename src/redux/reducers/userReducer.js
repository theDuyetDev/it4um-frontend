const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "USER_LOGOUT":
      return initialState;
    case "UPDATE_USER_INFO":
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default userReducer;
