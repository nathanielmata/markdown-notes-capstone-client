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
      <section className="LoginPage">
        <h2>Login</h2>
        {TokenService.getAuthToken()
          ? this.props.history.push('/')
          : <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        }
      </section>
    );
  }
}
