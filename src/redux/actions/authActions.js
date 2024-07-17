export const userLogin = ({ user, token }) => ({
  type: "USER_LOGIN",
  payload: { user, token },
});

export const adminLogin = ({ admin, token }) => ({
  type: "ADMIN_LOGIN",
  payload: { admin, token },
});

export const userLogout = () => ({
  type: "USER_LOGOUT",
});

export const adminLogout = () => ({
  type: "ADMIN_LOGOUT",
});

export const updateUserInfo = (user) => ({
  type: "UPDATE_USER_INFO",
  payload: { user },
});
