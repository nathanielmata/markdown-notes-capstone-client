import React, { Component } from "react";
import AuthApiService from "../services/auth-api-service";

export default class LoginForm extends Component {

  static defaultProps = {
    onLoginSuccess: () => {},
  };

  state = { error: null };

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = "";
        password.value = "";
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="form__login" onSubmit={this.handleSubmitJwtAuth}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="user_name form__input--group">
          <label htmlFor="user_name">User name</label>
          <input type="text" id="user_name" name="user_name" required></input>
        </div>
        <div className="password form__input--group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}
