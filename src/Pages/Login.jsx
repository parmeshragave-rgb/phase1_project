import React, { Component } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";



export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      username: '',
      password: '',
      email: '',
      message: '',
      errors: {},
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { isLogin, username, password, email } = this.state;
    const { navigate } = this.props;
    const errors = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!isLogin) {
      if (!email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Enter a valid email';
      }
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors: errors });
      return;
    }

    this.setState({ errors });

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isLogin) {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.setState({ message: 'Login successful!' });
        localStorage.setItem('token', 'true');
        const userCartKey = `cart_${user.username}`;
        const existingCart =
          JSON.parse(localStorage.getItem(userCartKey)) || [];
        localStorage.setItem('cart', JSON.stringify(existingCart));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        this.setState({ message: 'Invalid username or password!' });
      }
    } else {
      const newUser = {
        id: Date.now(),
        username: username,
        email: email,
        password: password,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', JSON.stringify(newUser));
      localStorage.setItem('token', 'true');

      window.dispatchEvent(new Event('storage'));
      navigate('/');
    }
  }

  handleGoogleSuccess = async (credentialResponse) => {
  const token = credentialResponse.credential;
  const decoded = jwtDecode(token);

  const user = {
    username: decoded.name,
    email: decoded.email,
    picture: decoded.picture,
    id: decoded.sub,
  };

  localStorage.setItem('loggedInUser', JSON.stringify(user));
  localStorage.setItem('token', 'true');

  const userCartKey = `cart_${user.username}`;
  const existingCart =
    JSON.parse(localStorage.getItem(userCartKey)) || [];
  localStorage.setItem('cart', JSON.stringify(existingCart));

  window.dispatchEvent(new Event('storage'));


  this.props.navigate('/');
};

  handleGoogleFailure = () => {
    this.setState({ message: "Google login failed!" });
  };


  toggleMode() {
    this.setState((prev) => ({
      isLogin: !prev.isLogin,
      message: '',
      username: '',
      password: '',
      email: '',
      errors: {},
    }));
  }

  render() {
    const { isLogin, username, password, email, message, errors } = this.state;

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(to right, #ece9e6, #ffffff)',
          px: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            textAlign: 'center',
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Typography>

          <form onSubmit={this.handleSubmit}>
            <Stack spacing={2}>
              {!isLogin && (
                <TextField
                  label="Email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  fullWidth
                  required
                  error={!!errors.email}
                  helperText={errors.email || ''}
                />
              )}

              <TextField
                label="Username"
                placeholder="nameuser"
                name="username"
                value={username}
                onChange={this.handleChange}
                fullWidth
                required
                error={!!errors.username}
                helperText={errors.username || ''}
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={this.handleChange}
                fullWidth
                required
                error={!!errors.password}
                helperText={errors.password || ''}
              />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  borderRadius: '50px',
                  bgcolor: '#eb9514ff',
                  fontFamily: 'sans-serif',
                  color: 'black',
                }}
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>


              <Typography variant="body2" align="center">OR</Typography>

              {/* <GoogleLogin
                onSuccess={this.handleGoogleSuccess}
                onError={this.handleGoogleFailure}
              fullWidth/> */}

              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin
                  onSuccess={this.handleGoogleSuccess}
                  onError={this.handleGoogleFailure}
                  width="100%"
                  theme="outline"
                  size="large"
                  type="standard"
                  shape="rectangular"
                  
                />
              </Box>
            </Stack>
          </form>

          <Typography
            variant="body2"
            sx={{
              mt: 2,
              cursor: 'pointer',
              color: '#000007ff',
              textDecoration: 'underline',
            }}
            onClick={this.toggleMode}
          >
            {isLogin
              ? 'New user? Create an account'
              : 'Already have an account? Login'}
          </Typography>

          {message && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Paper>
      </Box>
    );
  }
}

function WrapperLogin() {
  const navigate = useNavigate();
  return <Login navigate={navigate} />;
}

export default WrapperLogin;
