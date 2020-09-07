import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import Search from './search/container/Search';
import User from './user/container/User';
import Login from './auth/container/Login';
import Signup from './auth/container/Signup';
import { useDispatch } from 'react-redux';
import { actions as authActions } from './auth/state';

export default function App() {
  useEffect(() => {
    // 로딩 후에, Downloading...을 없애기 위함
    const bodyEl = document.getElementsByTagName('body')[0];
    const loadingEl = document.getElementById('init-loading');
    bodyEl.removeChild(loadingEl);
  }, []);
  // 가입한 유저 정보 유지
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.fetchUser());
  }, [dispatch]);
  return (
    <>
      <Route exact path="/" component={Search} />
      <Route exact path="/user/:name" component={User} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </>
  );
}
