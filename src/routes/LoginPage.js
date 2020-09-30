import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import UserContext from "../context/UserContext";
import TokenService from "../services/token-service";

export default class LoginPage extends Component {
  static contextType = UserContext;

  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = (token) => {
    const user = TokenService.readJwtToken(token) ?? this.context.user;
    this.context.setUser(user);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <section className="login">
        <div className="login__inner">
          <h2>Sign in</h2>
          {TokenService.getAuthToken()
            ? this.props.history.push('/')
            : <LoginForm onLoginSuccess={(token) => this.handleLoginSuccess(token)} />
          }
        </div>
      </section>
    );
  }
}
