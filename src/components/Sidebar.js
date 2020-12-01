import React from 'react';
import { Link } from 'react-router-dom';
import { CloseIcon } from './Icons';

const Sidebar = (props) => (
  <nav className="nav__sidebar" style={{height: sidebarHeight()}}>

    <div className="nav__sidebar--close" onClick={() => props.closeMenus()}>
      <CloseIcon />
    </div>

    <div className="nav__sidebar--list">

      {props.notes.length < 1 &&
        <div className="nav__sidebar--list-empty">
          <h2>You don't have any notes</h2>
          <a className="button" href="/note/new">Create New Note</a>
        </div>
      }

      <ul>{props.notes.map((note, idx) => {
        return (
          <li key={idx}>
            <Link to={`/note/${note.id}`} title={note.title} onClick={() => props.closeMenus()}>
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

