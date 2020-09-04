import axios from 'axios';
import { API_HOST } from '../constant';
import { message } from 'antd';

/**
 *
 * @param {object} param
 * @param {'get' | 'post' =} param.method
 * @param {string} param.url
 * @param {object=} param.params
 * @param {object=} param.data
 * @param {object=} param.totalCount
 */
export function callApi({ method = 'get', url, params, data }) {
  return axios({
    url,
    method,
    baseURL: API_HOST,
    params,
    data,
    withCredentials: true, // 사용자 인증 토큰
  }).then((response) => {
    const { resultCode, resultMessage, totalCount } = response.data;
    if (resultCode < 0) {
      // 에러
      message.error(resultMessage);
    }
    return {
      isSuccess: resultCode === ResultCode.Success,
      data: response.data.data,
      resultCode,
      resultMessage,
      totalCount,
    };
  });
}

// 성공 enum
export const ResultCode = {
  Success: 0,
};
