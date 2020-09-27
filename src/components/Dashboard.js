import React from "react";
import NoteListContext from "../context/NoteListContext";

class Dashboard extends React.Component {
  static contextType = NoteListContext;

  timeUnits = () => {
    // time units (minute, hour, day) in milliseconds
    const unitMs = {
      m: 1000*60,
      h: 1000*60*60,
      d: 1000*60*60*24,
    }

    // return array of objects containing
    // r: time range validator
    // d: time unit in milliseconds
    // s: time suffix
    return [
      {r: (ms) => ms < unitMs.h, d: unitMs.m, s: " min ago"},
      {r: (ms) => ms > unitMs.h && ms < unitMs.d, d: unitMs.h, s: " hours ago"},
      {r: (ms) => ms > unitMs.d, d: unitMs.d, s: " days ago"},
    ];
  }

  timeAgo = (date) => {
    const ms = (Date.now() - Date.parse(date));
    let time_ago = "";
    this.timeUnits().forEach(timestamp => {
      if (timestamp.r(ms)) {
        let timeUnits = Math.round(ms/timestamp.d).toString();
        let suffix = timestamp.s;
        time_ago = timeUnits + suffix;
      }
    })
    return time_ago;
  }

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
                    Edited {this.timeAgo(note.updated_at ?? note.created_at)}
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