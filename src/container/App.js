import React, { Component } from 'react';
import LoginPageWithApiProgress from '../pages/LoginPage';
import UserSignupPageWithApiProgress from '../pages/UserSignupPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import IssuesPage from '../pages/IssuesPage';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar'
//HashRouter kullanarak uygulamayi single page application haline getirmis olduk.
import { useSelector } from 'react-redux';
import IssueDetailPage from '../pages/IssueDetailPage';
import ManagementPage from '../pages/ManagementPage';
import AppDetailPage from '../pages/AppDetailPage';

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
          <Route path="/management" component={ManagementPage} />
          <Route path="/issues" component={IssuesPage} />
          <Route path="/issue/:id/:disabled" component={IssueDetailPage} />
          <Route path="/app/:id/:disabled" component={AppDetailPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div> //eger parametre alan bir path tanimlamak isteseydik "<Route path="/user/:email" component={ComponentName} />" bunun gibi yapardik.
  );
}

export default App;
