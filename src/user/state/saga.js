import { all, takeEvery, call, put, takeLeading } from 'redux-saga/effects';
import { Types, actions } from './index';
import { callApi } from '../../common/util/api';
import { makeFetchSaga, deleteApiCache } from '../../common/util/fetch';

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

// 부서 업데이트
function* fetchUpdateUser({ user, key, value }) {
  const oldValue = user[key]; // 현재값
  yield put(actions.setValue('user', { ...user, [key]: value })); // 새로운 값 생성
  const { isSuccess, data } = yield call(callApi, {
    url: 'user/update',
    method: 'post',
    data: { name: user.name, key, value, oldValue }, // 수정하려는 값과 이전 값
  });

  if (isSuccess && data) {
    // autoComplete에서 canCache: true 설정 때문에, 메인에서 부서가 안바뀜, 이를 없애주는 작업 필요
    deleteApiCache();
    yield put(actions.addHistory(data.history));
  } else {
    // 이전값을 주면서 롤백
    yield put(actions.setValue('user', user));
  }
}

function* fetchUserHistory({ name }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/history',
    params: { name },
  });

  if (isSuccess && data) {
    yield put(actions.setValue('userHistory', data));
  }
}

// api 통신은 saga 쪽에서
export default function* () {
  yield all([
    takeEvery(
      Types.FetchUser,
      makeFetchSaga({ fetchSaga: fetchUser, canCache: false }) // 통신상태 관리
    ),
    takeLeading(
      Types.FetchUpdateUser,
      makeFetchSaga({ fetchSaga: fetchUpdateUser, canCache: false })
    ),
    takeLeading(
      Types.FetchUserHistory,
      makeFetchSaga({ fetchSaga: fetchUserHistory, canCache: false })
    ),
  ]);
}
