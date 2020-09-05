import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import Search from './search/container/Search';
import User from './user/container/User';

export default function App() {
  useEffect(() => {
    // 로딩 후에, Downloading...을 없애기 위함
    const bodyEl = document.getElementsByTagName('body')[0];
    const loadingEl = document.getElementById('init-loading');
    bodyEl.removeChild(loadingEl);
  }, []);
  return (
    <>
      <Route exact path="/" component={Search} />
      <Route exact path="/user/:name" component={User} />
    </>
  );
}
