import React from 'react';
import { Link } from 'react-router-dom';
import HeaderNavList from "./HeaderNavList";

class HeaderNotLoggedIn extends React.Component {
  render() {
    return (
      <HeaderNavList>
        <li>
          <Link to="/login" className="button" >SIGN IN</Link>
        </li>
      </HeaderNavList>
    );
  }
}

export default HeaderNotLoggedIn;