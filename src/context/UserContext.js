import React, { Component } from "react";
import TokenService from "../services/token-service";

export const emptyUser = {
  full_name: "",
  user_id: null,
};

const UserContext = React.createContext({
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  state = {
    error: null,
    user: emptyUser,
  };

  componentDidMount() {
    const user = TokenService.readJwtToken() ?? emptyUser;
    this.setUser(user);
  }

  setError = (error) => {
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setUser = (user) => {
    this.setState({ user });
  };

  clearUser = () => {
    this.setUser(emptyUser);
  };

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      clearUser: this.clearUser,
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
