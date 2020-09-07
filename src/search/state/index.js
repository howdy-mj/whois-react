import {
  createReducer,
  createSetValueAction,
  setValueReducer,
  FETCH_PAGE,
} from '../../common/redux-helper';

// enum
export const Types = {
  SetValue: 'search/SetValue',
  FetchAutoComplete: 'search/FetchAutoComplete', // 자동완성을 위해 api 호출
  FetchAllHistory: 'search/FetchAllHistory', // 메인페이지에 전체 히스토리 가져오기
};

export const actions = {
  setValue: createSetValueAction(Types.SetValue),
  fetchAutoComplete: (keyword) => ({
    type: Types.FetchAutoComplete,
    keyword,
  }),
  fetchAllHistory: () => ({ type: Types.FetchAllHistory, [FETCH_PAGE]: 0 }),
};

const INITIAL_STATE = {
  keyword: '',
  autoCompletes: [],
  history: [],
};

const reducer = createReducer(INITIAL_STATE, {
  [Types.SetValue]: setValueReducer,
});

export default reducer;
