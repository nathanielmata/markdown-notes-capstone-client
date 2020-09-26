import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../services/token-service";
import Sidebar from "./Sidebar";
import HeaderNavList from "./HeaderNavList";
import { ProfileIcon, SidebarOpenIcon } from "./Icons";

class HeaderLoggedIn extends React.Component {

  state = {
    menus: {
      sidebar: false,
      user: false,
    },
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escKeyPress, false);
  }

  handleLogout = () => {
    this.closeMenus();
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
    const { user, notes } = this.props;

    return (
      <>
        {menus.sidebar && (
          <Sidebar notes={notes} closeMenus={this.closeMenus} />
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
            {/* <img className="header__user--img" src="/user-pic-greybox.jpg" alt={user.name + "'s user image"} /> */}
            <ProfileIcon classVariant="header__user--img"/>
            <span className="header__user--span">{user.name}</span>
          </div>
          <>
            {menus.user &&
              <ul className="header__dropdown header__user--dropdown">
                <li><Link to="/" onClick={() => this.closeMenus()}>Dashboard</Link></li>
                <li><Link to={`/profile/${user.id}`} onClick={() => this.closeMenus()}>Profile</Link></li>
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