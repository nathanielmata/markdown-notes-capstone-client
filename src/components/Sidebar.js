import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarCloseIcon } from './Icons';
import { LockIcon, UnlockIcon } from './Icons';

const Sidebar = (props) => (
  <nav className="nav__sidebar" style={{height: sidebarHeight()}}>

    <div className="nav__sidebar--close" onClick={() => props.closeMenus()}>
      <SidebarCloseIcon />
    </div>

    <div className="nav__sidebar--search">
      <input className="nav__sidebar--input" type="text" />
      <button>GO</button>
    </div>

    <div className="nav__sidebar--list">
      <ul>{props.notes.map((note, idx) => {
        return (
          <li key={idx}>
            <Link to={`/note/${note.id}`} title={note.title} onClick={() => props.closeMenus()}>
              <>
                {!note.public 
                  ? <LockIcon className="nav__sidebar--icons"/>
                  : <UnlockIcon className="nav__sidebar--icons" />}
              </>
              <span className="nav__sidebar--list-title">
                {note.title.length > 24
                  ? note.title.slice(0,23) + "..."
                  : note.title}
              </span>
            </Link>
          </li>
          )
        }
      )}</ul>
    </div>
    
  </nav>
);

export default Sidebar;

const sidebarHeight = () => {
  const height = document.getElementById("main__container").offsetHeight;;
  return `${height}px`;
}

