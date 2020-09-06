import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarOpenIcon } from './Icons';

const Header = (props) => (
  <header className="header">
    {props.children}
    <>
      {!props.menus.sidebar && 
        <div className="sidebar__toggle" onClick={() => props.toggleHiddenMenu("sidebar")}>
          <div className="sidebar__toggle--bar">
            <SidebarOpenIcon />
          </div>
        </div>
      }
    </>
    <div className="header__user">
      <div className="header__user--inner" onClick={() => props.toggleHiddenMenu("user")}>
        <img className="header__user--img" src="/user-pic-greybox.jpg" alt={props.user.name + "'s user image"} />
        <span className="header__user--span">{props.user.name}</span>
      </div>
      <>
        {props.menus.user &&
          <ul className="header__dropdown header__user--dropdown">
            <li><a href="/">Profile</a></li>
            <li><a href="/">Logout</a></li>
          </ul>}
      </>
    </div>
    <nav className="header__nav">
      <ul>
        <li>
          <Link to="/note/new" className="button" onClick={() => props.toggleHiddenMenu("sidebar")}>NEW+</Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header;