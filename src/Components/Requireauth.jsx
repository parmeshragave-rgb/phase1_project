// import React, { Component } from "react";
// import { useAuth } from "../Components/AuthProvider";
// import { Navigate } from "react-router-dom";

// class Requireauth extends Component {
//   render() {
//     if (!this.props.auth.user) {
      
//       return <Navigate to="/login"/>;
//     }

//     return this.props.children;
//   }
// }

// function Wrapperrequireauth({ children }) {
//   const auth = useAuth();
//   return <Requireauth auth={auth}>{children}</Requireauth>;
// }

// export default Wrapperrequireauth;
