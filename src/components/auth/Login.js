import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
const Login = ({ loginUser, auth }) => {
  const { isAuthenticated, loading } = auth;
  // if (isAuthenticated) {
  //   history.push("/dashboard");
  // }
  const [login, SetLogin] = useState({
    email: "",
    password: ""
  });
  const handleChange = e => {
    SetLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    loginUser(login);
    clearForm();
  };
  const clearForm = () => {
    SetLogin({
      email: "",
      password: ""
    });
  };
  if (auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  const { email, password } = login;
  return (
    <React.Fragment>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Enter Email..."
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password..."
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btn btn-primary btn-block ">Login</button>
        </div>
      </form>
    </React.Fragment>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
