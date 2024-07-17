const initialState = {
  isAuthenticated: false,
  admin: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload,
        token: action.payload.token,
      };
    case "ADMIN_LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default adminReducer;
