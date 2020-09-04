import { all, put, call, takeEvery } from 'redux-saga/effects';
import { actions, Types } from './index';
import { callApi } from '../../common/util/api';

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

export default function* () {
  // 앞의 액션이 발생하면, 뒤의 함수 실행
  yield all([takeEvery(Types.FetchAutoComplete, fetchAutoComplete)]);
}
