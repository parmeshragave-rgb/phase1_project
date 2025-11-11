import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const token = localStorage.getItem('token');

    if (!token) {
      return <Navigate to="/login" />;
    }

    return this.props.children;
  }
}

export default ProtectedRoute;
