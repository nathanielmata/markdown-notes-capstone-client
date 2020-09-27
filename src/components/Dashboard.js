import React from "react";
import timeAgo from "../utils/timeAgo";
import NoteListContext from "../context/NoteListContext";

class Dashboard extends React.Component {
  static contextType = NoteListContext;
  
  render() {
    const { notes } = this.context;
    console.log(notes);
    return (
      <div className="main__dashboard">
        <h1>Latest Notes</h1>
        <div className="main__dashboard--inner">
          {notes.reverse().map((note, idx) => {
            return (
              <div key={idx} className="main__dashboard--card">
                <a href={`/note/${note.id}`}>
                  <div className="main__dashboard--card-name">{note.title}</div>
                  <div className="main__dashboard--card-date">
                    Edited {timeAgo.parse(note.updated_at ?? note.created_at)}
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