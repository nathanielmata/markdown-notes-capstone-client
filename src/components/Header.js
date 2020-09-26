import React from "react";
import NoteListContext from "../context/NoteListContext";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderNotLoggedIn from "./HeaderNotLoggedIn";
import TokenService from "../services/token-service";

export default class Header extends React.Component {
  static contextType = NoteListContext;

  render() {
    const { user } = this.props;
    const { notes } = this.context;

    return (
      <header className="header">
        {TokenService.hasAuthToken()
          ? <HeaderLoggedIn user={user} notes={notes} />
          : <HeaderNotLoggedIn />
        }
      </header>
    );
  }
}
