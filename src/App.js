import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/layouts/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./routing/PrivateRoute";
import SetAuthToken from "./utils/SetAuthToken";
import { loadUser } from "./actions/authActions";

if (localStorage.token) {
  SetAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container ">
            <div className="mx-auto">
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </div>
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default App;
