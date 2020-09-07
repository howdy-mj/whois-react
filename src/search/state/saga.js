import { all, put, call, takeEvery, takeLeading } from 'redux-saga/effects';
import { actions, Types } from './index';
import { callApi } from '../../common/util/api';
import { makeFetchSaga } from '../../common/util/fetch';

function* fetchAutoComplete({ keyword }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/search',
    params: { keyword }, // 서버가 키워드를 보고, 있는 것을 반환
  });

  if (isSuccess && data) {
    // 성공하고 데이터가 있다면, 데이터 저장
    yield put(actions.setValue('autoCompletes', data));
  }
}

function* fetchAllHistory({ _, page }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/history',
    params: { page },
  });

  if (isSuccess && data) {
    yield put(actions.setValue('history', data)); // 데이터가 오면 history에 넣는 것
  }
}

export default function* () {
  // 앞의 액션이 발생하면, 뒤의 함수 실행
  yield all([
    takeEvery(
      Types.FetchAutoComplete,
      makeFetchSaga({ fetchSaga: fetchAutoComplete, canCache: true })
    ),
    takeLeading(
      Types.FetchAllHistory,
      makeFetchSaga({ fetchSaga: fetchAllHistory, canCache: false })
    ),
  ]);
}
