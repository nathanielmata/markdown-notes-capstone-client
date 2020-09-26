import React from "react";

const HeaderNavList = (props) => (
  <nav className="header__nav">
    <ul>
      {props.children}
    </ul>
  </nav>
);

export default HeaderNavList;