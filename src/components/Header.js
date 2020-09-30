import React from "react";
import NoteListContext from "../context/NoteListContext";
import UserContext from "../context/UserContext";
import TokenService from "../services/token-service";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderNotLoggedIn from "./HeaderNotLoggedIn";

export default class Header extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {userCtx => (
          <NoteListContext.Consumer>
            {notesCtx => (
              <header className="header">
                {TokenService.hasAuthToken()
                  ? <HeaderLoggedIn notesCtx={notesCtx} userCtx={userCtx} />
                  : <HeaderNotLoggedIn />
                }
              </header>
            )}
          </NoteListContext.Consumer>
        )}
      </UserContext.Consumer>
    );
  }
}
