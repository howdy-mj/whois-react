import {
  createReducer,
  createSetValueAction,
  setValueReducer,
} from '../../common/redux-helper';
import { AuthStatus } from '../../common/constant';

export const Types = {
  SetValue: 'auth/SetValue',
  FetchLogin: 'auth/FetchLogin',
  SetUser: 'auth/SetUser', // 로그인이 완료 되었을 때 사가에서 호출할 함수
  FetchSignup: 'auth/FetchSignup',
  FetchUser: 'auth/FetchUser',
  FetchLogout: 'auth/FetchLogout',
};

export const actions = {
  setValue: createSetValueAction(Types.SetValue),
  fetchLogin: (name, password) => ({
    type: Types.FetchLogin,
    name,
    password,
  }),
  setUser: (name) => ({
    type: Types.SetUser,
    name,
  }),
  fetchSignup: (email) => ({
    type: Types.FetchSignup,
    email,
  }),
  fetchUser: () => ({
    type: Types.FetchUser,
  }),
  fetchLogout: () => ({ type: Types.FetchLogout }),
};

const INITIAL_STATE = {
  name: '',
  status: undefined, // 현재 상태를 모르는 것, util/constant의 status 사용
};
const reducer = createReducer(INITIAL_STATE, {
  [Types.SetValue]: setValueReducer,
  [Types.SetUser]: (state, action) => {
    state.name = action.name;
    state.status = action.name ? AuthStatus.Login : AuthStatus.NotLogin; // 사용자 이름이 있다면 로그인
  },
});

export default reducer;
