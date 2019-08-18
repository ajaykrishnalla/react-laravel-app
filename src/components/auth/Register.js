import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
const Register = ({ registerUser, auth }) => {
  const [register, SetRegister] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const { name, email, password, password_confirmation } = register;
  const handleChange = e => {
    SetRegister({ ...register, [e.target.name]: e.target.value });
  };
  const handleForm = e => {
    e.preventDefault();
    registerUser(register);
  };
  if (auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <React.Fragment>
      <form onSubmit={handleForm}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">EMail</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            type="text"
            name="password"
            className="form-control"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">confirm password</label>
          <input
            type="text"
            name="password_confirmation"
            className="form-control"
            value={password_confirmation}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btn btn-primary btn-block" type="submit">
            Register
          </button>
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
  { registerUser }
)(Register);
