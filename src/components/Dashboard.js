import React from "react";
import TimeAgo from "../utils/time-ago";
import NoteListContext from "../context/NoteListContext";

class Dashboard extends React.Component {
  static contextType = NoteListContext;
  
  render() {
    const { notes } = this.context;

    if (notes.length < 1) {      
      return (
        <div className="main__dashboard main__dashboard--empty">
          <h2>You don't have any notes</h2>
          <a className="button" href="/note/new">Create New Note</a>
        </div>
      );
    }

    return (
      <div className="main__dashboard">
        <h1>Latest Notes</h1>
        <div className="main__dashboard--inner">
          {notes.map((note, idx) => {
            return (
              <div key={idx} className="main__dashboard--card">
                <a href={`/note/${note.id}`}>
                  <div className="main__dashboard--card-name">{note.title}</div>
                  <div className="main__dashboard--card-date">
                    Edited {TimeAgo.parse(note.updated_at ?? note.created_at)}
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Dashboard