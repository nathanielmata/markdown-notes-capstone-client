import React from 'react';
import MarkdownNotesContext from '../MarkdownNotesContext';
import Note from './Note';

class NoteUpdate extends React.Component { 
  static contextType = MarkdownNotesContext;

  render() {
    const id = this.props.match.params.id;
    const note = this.context.getNote(id);
    if (note === "notfound") {
      return (
        <h2>Note not found.</h2>
      );
    }

    return <Note note={note}/>
  }
};

export default NoteUpdate;