export const USER_LOGIN = 'USER_LOGIN';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: { email },
});
