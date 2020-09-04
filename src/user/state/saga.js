import { all, takeEvery, call, put } from 'redux-saga/effects';
import { Types, actions } from './index';
import { callApi } from '../../common/util/api';

function* fetchUser({ name }) {
  const { isSuccess, data } = yield call(callApi, {
    url: 'user/search',
    params: { keyword: name },
  });

  if (isSuccess && data) {
    const user = data.find((item) => item.name === name);

    if (user) {
      yield put(actions.setValue('user', user));
    }
  }
}

// api 통신은 saga 쪽에서
export default function* () {
  yield all([takeEvery(Types.FetchUser, fetchUser)]);
}
