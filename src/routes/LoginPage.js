import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import TokenService from "../services/token-service";

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  render() {
    return (
      <section className="login">
        <div className="login__inner">
          <h2>Sign in</h2>
          {TokenService.getAuthToken()
            ? this.props.history.push('/')
            : <LoginForm onLoginSuccess={this.handleLoginSuccess} />
          }
        </div>
      </section>
    );
  }
}
