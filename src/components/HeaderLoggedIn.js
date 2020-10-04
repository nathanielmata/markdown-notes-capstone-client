import React from "react";
import { Link } from "react-router-dom";
import NoteApiService from "../services/note-api-service";
import TokenService from "../services/token-service";
import Sidebar from "./Sidebar";
import HeaderNavList from "./HeaderNavList";
import { ProfileIcon, SidebarOpenIcon } from "./Icons";

class HeaderLoggedIn extends React.Component {
  state = {
    user: {},
    menus: {
      sidebar: false,
      user: false,
    },
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escKeyPress, false);
    this.getNotes(this.props.notesCtx);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escKeyPress, false);
  }

  getNotes = (ctx) => {
    ctx.clearError();
    NoteApiService.getNotes()
      .then((notes) => ctx.setNotes(notes.reverse()))
      .catch((err) => ctx.setError(err));
  }

  handleLogout = () => {
    this.closeMenus();
    this.props.userCtx.clearUser();
    TokenService.clearAuthToken();
  }

  escKeyPress = ({ key }) => {
    if (key === "Escape") {
      this.closeMenus();
    }
  };

  closeMenus = () => {
    this.setState((state) => {
      // close menus when a navigation link is clicked
      const menus = {};
      Object.keys(state.menus).forEach((k) => {
        menus[k] = false;
      });
      return { menus };
    });
  };

  toggleMenu = (name) => {
    this.setState((state) => {
      // toggle the clicked menu and close other menus we are tracking with state
      const menus = {};
      Object.keys(state.menus).forEach((k) => {
        name === k ? (menus[k] = !this.state.menus[k]) : (menus[k] = false);
      });
      return { menus: { ...menus } };
    });
  };

  render() {
    const { menus } = this.state;
    const { userCtx, notesCtx } = this.props;

    return (
      <>
        {menus.sidebar && (
          <Sidebar notes={notesCtx.notes} closeMenus={this.closeMenus} />
        )}
        <>
          {!menus.sidebar && 
            <div className="sidebar__toggle" onClick={() => this.toggleMenu("sidebar")}>
              <div className="sidebar__toggle--bar">
                <SidebarOpenIcon />
              </div>
            </div>
          }
        </>
        <div className="header__user">
          <div className="header__user--inner" onClick={() => this.toggleMenu("user")}>
            <ProfileIcon classVariant="header__user--img"/>
            <span className="header__user--span">{userCtx.user.full_name}</span>
          </div>
          <>
            {menus.user &&
              <ul className="header__dropdown header__user--dropdown">
                <li><Link to="/" onClick={() => this.closeMenus()}>Dashboard</Link></li>
                <li><Link to="/" onClick={() => this.handleLogout()}>Logout</Link></li>
              </ul>}
          </>
        </div>
        <HeaderNavList>
          <li>
            <Link to="/note/new" className="button" onClick={() => this.closeMenus()}>NEW+</Link>
          </li>
        </HeaderNavList>
      </>
    );
  }
}

export default HeaderLoggedIn;