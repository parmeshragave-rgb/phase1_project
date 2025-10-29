
// import React, { Component } from "react";
// import { TextField, Button, Stack, Typography, Box} from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Components/AuthProvider";


class Login extends Component {

//  constructor(props) {
//     super(props);
//     this.state = {
//       user: "",
//     };
//   }

//   handleLogin = () => {
    // const { navigate } = this.props;
//     auth.login(this.state.user);
//     navigate("/profile");
//   };
    
  render() {
    return (
      <>

      
      <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",mt:"140px",p:"50px"}}>
      
        <Stack spacing={2} width="300px">
        <Typography variant="h3" sx={{fontFamily:"sans-serif",fontWeight:"bold",color:"inherit",display:"flex",justifyContent:"center"}}gutterBottom>Login</Typography>

          <TextField variant="outlined" label="Username" type="text" onChange={(e) => this.setState({ user: e.target.value })} fullWidth/>
          <TextField variant="outlined" label="Password" type="password" fullWidth/>
          <Button variant="contained" onClick={this.handleLogin}>
            Login
          </Button>
        </Stack>
        </Box>
      
      </>
    );
  }
}

// function WrapperLogin() {
//   const navigate = useNavigate();
//   const auth = useAuth();
//   return <Login navigate={navigate} auth={auth} />;
// }

export default Login
