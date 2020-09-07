// api가 필요할 때 여기서 불러오기
export const API_HOST = process.env.REACT_APP_API_HOST;

// enum으로 관리
export const FetchStatus = {
  Request: 'Request',
  Success: 'Success',
  Fail: 'Fail',
};

export const AuthStatus = {
  Login: 'Login',
  NotLogin: 'NotLogin',
};
