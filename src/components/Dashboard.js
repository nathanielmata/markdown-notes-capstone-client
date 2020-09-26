import React from "react";
import NoteListContext from "../context/NoteListContext";

class Dashboard extends React.Component {
  static contextType = NoteListContext;

  formatDate = (date) => {
    const ms = (Date.now() - Date.parse(date));
    const days = Math.floor(ms/1000/60/60/24);
    return days.toString() + " days ago";
  }

  render() {
    const { notes } = this.context;
    console.log(notes);
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
                    Edited {this.formatDate(note.updated_at ?? note.created_at)}
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