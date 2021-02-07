import React from 'react';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';


function App() {
  return (
    <div className="row">
      <div className="col-5">
        <LoginPage />
      </div>

      <div className="col-7 ">
        <UserSignupPage></UserSignupPage>
      </div>

      <LanguageSelector />
    </div>
  );
}

export default App;
