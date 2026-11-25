import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Input from '../components/loginComponents/input/input';
import Button from '../components/loginComponents/button/button';
import Navbar from '../components/loginComponents/Navbar';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login - Faculty of Science';
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [loginError, setLoginError] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoginError('');

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (!isEmailValid || !isPasswordValid) return;

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message || 'Invalid email or password');
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(data));
      navigate('/profile');
    } catch (error) {
      setLoginError('Cannot connect to server. Make sure backend is running.');
    }
  }

  function validateEmail() {
    if (email.trim() === '') {
      setEmailErrorMessage('email can not be empty');
      return false;
    } else if (!email.trim().match(emailRegex)) {
      setEmailErrorMessage('email is invalid');
      return false;
    }
    setEmailErrorMessage('');
    return true;
  }

  function validatePassword() {
    if (password.trim() === '') {
      setPasswordErrorMessage('password can not be empty');
      return false;
    } else if (password.length < 8) {
      setPasswordErrorMessage('password must be longer than or equal to 8 characters long');
      return false;
    }
    setPasswordErrorMessage('');
    return true;
  }

  return (
    <>
      <Navbar />
      <main>
        <div id="loginBox">
          <h1 id="loginHeader">Sign into your account</h1>
          <p id="guid">Enter your institutional credentials to access your dashboard.</p>
          {loginError && <p id="emailErrorMessage">{loginError}</p>}

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="email">Institutional Email</label>
            <Input
              className="input"
              id="email"
              placeholder="[name@university.edu]"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p id="emailErrorMessage">{emailErrorMessage}</p>

            <label>Password</label>
            <Input
              className="input"
              id="password"
              placeholder="[••••••••••••]"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p id="passwordErrorMessage">{passwordErrorMessage}</p>

            <br />
            <input id="keepMeSignedInCheckBox" type="checkbox" />
            <label>keep me signed in</label>

            <Button id="SignInButton">Sign In</Button>
          </form>

          <Link id="registerFromHereLink" to="/register">
            Don't have an account ? Register from here
          </Link>
        </div>
      </main>
    </>
  );
}

export default Login;