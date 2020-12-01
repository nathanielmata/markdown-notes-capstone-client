import React from 'react';
import HeaderNavList from "./HeaderNavList";

class HeaderNotLoggedIn extends React.Component {
  landingHeader = () => {
    return (
      <>
        { this.homeLink("left") }
        <HeaderNavList>
          <li><a href="/how-to" className="button noauth" >HOW TO</a></li>
          <li><a href="/login" className="button noauth" >SIGN IN</a></li>
        </HeaderNavList>
      </>
    );
  }

  loginHeader = () => {
    return (
      <> { this.homeLink("center") } </>
    );
  }

  homeLink = (classVariant) => {
    return <a href="/" className={"home__link " + classVariant}>Markdown Notes</a>;
  }

  render() {
    return (
      <>
        { window.location.pathname !== "/login"
          ? this.landingHeader()
          : this.loginHeader()
        }
      </>
    );
  }
}

export default HeaderNotLoggedIn;