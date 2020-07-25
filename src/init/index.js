import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";

//Main App
import RctDefaultLayout from "../container/DefaultLayout";

/** Initial Path To Check Whether User Is Logged In Or Not */
const InitialPath = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    const { location, match, user } = this.props;
    if (location.pathname === "/") {
      if (user === null) {
        return <Redirect to={"/auth/login-page"} />;
      } else {
        return <Redirect to={"/admin/dashboard/"} />;
      }
    }
    return (
      <div>
        <InitialPath
          path={`${match.url}app`}
          authUser={user}
          component={RctDefaultLayout}
        />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const { user } = authUser;
  return { user };
};

export default connect(mapStateToProps)(App);
