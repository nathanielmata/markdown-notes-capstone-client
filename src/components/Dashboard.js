import React from "react";
import TimeAgo from "../utils/time-ago";
import NoteListContext from "../context/NoteListContext";

class Dashboard extends React.Component {
  static contextType = NoteListContext;
  
  render() {
    const { notes } = this.context;
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