import Main from './components/main';
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import back from './images/signup.jpg';
import back2 from './images/signin.jpg';
import './App.css';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  let [signin, SetSignin] = useState(false);
  return (
    <body>
      {
        isLogin ?
          <Main />
          :
          <div className="main-box">
            <div className={signin ? "signup hide" : "signup show"}>
              <div className="signup-left">
                <div className="signup-title">
                  <h2>Sign up</h2>
                </div>
                <div className="inputs">
                  <input type="text" placeholder='Enter Your Name' />
                  <input type="email" placeholder='Enter Your Email' />
                  <input type="password" placeholder='Enter Your Password' />
                  <input type="password" placeholder='Repeat Your Password' />
                </div>
                <div className="bottom">
                  <button onClick={() => {
                    SetSignin(!signin);
                  }}>Register</button>
                </div>
              </div>
              <div className="signup-right">
                <img src={back} alt="SinUp-back" />
                <h2 onClick={() => {
                  SetSignin(!signin);
                }}>I am already a member</h2>
              </div>
            </div>
            <div className={signin ? "signin show" : "signin hide"}>
              <div className="signin-left">
                <img src={back2} alt="SignIn" />
                <h2 onClick={() => {
                  SetSignin(!signin);
                }}>Create An Account</h2>
              </div>
              <div className="signin-right">
                <div className="signin-title">
                  <h2>Sign In</h2>
                </div>
                <div className="inputs">
                  <input type="email" placeholder='Enter Your Email' />
                  <input type="password" placeholder='Enter Your Password' />
                </div>
                <div className="bottom">
                  <button onClick={()=>{
                    setIsLogin(true);
                  }}>Log In</button>
                </div>
              </div>
            </div>
          </div>
      }
    </body>

  );
}

export default App;