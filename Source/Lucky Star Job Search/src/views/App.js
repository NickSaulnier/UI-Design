import React from 'react';
import { useSelector } from "react-redux";
import { LOGIN_STATE } from "../redux/storeConstants";
import Login from '../components/Login';
import JobSearchApp from '../components/JobSearchApp';

const App = () => {
  const loginState = useSelector(state => state.loginState);

  return (
    <>
        {
            loginState !== LOGIN_STATE.LOGGED_IN ?
                <Login />
                :
                <JobSearchApp />
        }
    </>
  )
}

export default App;
