import { useState } from "react";
import axios from "axios";
import HomePage from "./HomePage"; 
import "./App.css";

function App() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showHomePage, setShowHomePage] = useState(false); 

  const handleRegisterClick = () => {
    setIsSignUpActive(true);
    setShowHomePage(false); 
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleLoginClick = () => {
    setIsSignUpActive(false);
    setShowHomePage(false); 
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleRegisterUser = () => {
    axios
      .post("http://localhost:3001/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Registration successful!", response.data);
        setIsSignUpActive(false);
        setName("");
        setEmail("");
        setPassword("");
        alert("Registration successful!");
      })
      .catch((error) => {
        console.error("Registration failed!", error);
        alert("Registration failed!");
      });
  };
  
  const handleSignIn = () => {
    axios
      .post("http://localhost:3001/login", {
        email: loginEmail,
        password: loginPassword,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          setLoginEmail("");
          setLoginPassword("");
          setIsSignUpActive(false);
          setShowHomePage(true);
        } else {
          alert("Password Incorrect or No record existed");
        }
      })
      .catch((error) => {
        console.error("Login failed!", error);
        alert("Login failed!");
      });
  };
  

  return (
    <>    
    {showHomePage ? (
          <HomePage />
        ) : (
      <div
        className={`container ${isSignUpActive ? "active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up">
          <form id="registrationForm">
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              id="nameInput"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              required
            />
            <input
              type="email"
              id="emailInput"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              id="passwordInput"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button type="button" onClick={handleRegisterUser}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form id="loginForm">
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
            </div>
            <span>or use your email password</span>
            <input
              type="email"
              id="loginEmailInput"
              placeholder="Email"
              value={loginEmail}
              onChange={handleLoginEmailChange}
              required
            />
            <input
              type="password"
              id="loginPasswordInput"
              placeholder="Password"
              value={loginPassword}
              onChange={handleLoginPasswordChange}
              required
            />
            <a href="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1">Forgot Your Password?</a>
            <button type="button" onClick={handleSignIn}>
              Sign In
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div
              className={`toggle-panel toggle-left ${
                isSignUpActive ? "active" : ""
              }`}
            >
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login" onClick={handleLoginClick}>
                Sign In
              </button>
            </div>
            <div
              className={`toggle-panel toggle-right ${
                isSignUpActive ? "" : "active"
              }`}
            >
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                className="hidden"
                id="register"
                onClick={handleRegisterClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
        )}
    </>
  );
}

export default App;
