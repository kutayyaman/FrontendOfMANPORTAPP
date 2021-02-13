import React, { Component } from 'react';
import LoginPageWithApiProgress from '../pages/LoginPage';
import UserSignupPageWithApiProgress from '../pages/UserSignupPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar'
//HashRouter kullanarak uygulamayi single page application haline getirmis olduk.
import { useSelector } from 'react-redux';

const App = () => {

  const { isLoggedIn } = useSelector((store) => { //redux store'daki bilgileri cekiyoruz
    return {
      isLoggedIn: store.isLoggedIn,
    };
  });

  return (
    <div>
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {!isLoggedIn && <Route path="/login" component={LoginPageWithApiProgress} />}
          <Route path="/signup" component={UserSignupPageWithApiProgress} />
          <Route path="/dashboard" component={DashboardPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div> //eger parametre alan bir path tanimlamak isteseydik "<Route path="/user/:email" component={ComponentName} />" bunun gibi yapardik.
  );
}

export default App;
