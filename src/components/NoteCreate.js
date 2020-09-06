import React from 'react';
import Note from './Note';

class NoteCreate extends React.Component { 
  getNewContent() {
    // later we can get and set default content when creating a new note here
    return {
      title: "Untitled",
      content: "# Create a new note",
    };
  }

  render() {
    return <Note note={this.getNewContent()} />
  }
};

export default NoteCreate;