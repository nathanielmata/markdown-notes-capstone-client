import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import TokenService from "../services/token-service";

export default class LoginPage extends Component {

  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <section className="login">
        <div className="login__demo">
          <div>
            <strong>demo email:</strong> <span>demouser1</span>
          </div>
          <div>
            <strong>demo password:</strong> <span>password1</span>
          </div>
        </div>
        <div className="login__inner">
          <h2>Sign in</h2>
          {TokenService.getAuthToken()
            ? this.props.history.push('/')
            : <LoginForm onLoginSuccess={() => this.handleLoginSuccess()} />
          }
        </div>
      </section>
    );
  }
}
