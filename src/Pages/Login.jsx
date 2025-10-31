import React, { Component } from "react";
import { Box, Button, TextField, Typography, Paper, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      username: "",
      password: "",
      email: "",
      message: "",
      errors: {}
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { isLogin, username, password, email } = this.state;
    const { navigate } = this.props;
    const errors = {};

    if (!username.trim()) {
      errors.username = "Username is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!isLogin) {
      if (!email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Enter a valid email";
      }
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ errors: {} });

    if (isLogin) {
      axios.post("https://fakestoreapi.com/auth/login", { username, password })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.setState({ message: "Login successful!" });
          navigate("/");
        })
        .catch(() => {
          this.setState({ message: "Login failed! Please check your details." });
        });
    } else {
      axios.post("https://fakestoreapi.com/users", { username, email, password })
        .then(() => {
          this.setState({
            message: "Account created successfully! You can now login.",
            isLogin: true,
            username: "",
            password: "",
            email: "",
          });
        })
        .catch(() => {
          this.setState({ message: "Failed to create account." });
        });
    }
  };

  toggleMode = () => {
    this.setState((prev) => ({
      isLogin: !prev.isLogin,
      message: "",
      username: "",
      password: "",
      email: "",
      errors: {},
    }));
  };

  render() {
    const { isLogin, username, password, email, message, errors } = this.state;

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to right, #ece9e6, #ffffff)",
          px: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {isLogin ? "Login" : "Sign Up"}
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
                  helperText={errors.email || ""}
                />
              )}

              <TextField
                label="Username"
                name="username"
                value={username}
                onChange={this.handleChange}
                fullWidth
                required
                error={!!errors.username}
                helperText={errors.username || ""}
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                fullWidth
                required
                error={!!errors.password}
                helperText={errors.password || ""}
              />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  borderRadius: "50px",
                  bgcolor: "#eb9514ff",
                  fontFamily: "sans-serif",
                  color: "black",
                }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </Stack>
          </form>

          <Typography
            variant="body2"
            sx={{
              mt: 2,
              cursor: "pointer",
              color: "#000007ff",
              textDecoration: "underline",
            }}
            onClick={this.toggleMode}
          >
            {isLogin
              ? "New user? Create an account"
              : "Already have an account? Login"}
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
