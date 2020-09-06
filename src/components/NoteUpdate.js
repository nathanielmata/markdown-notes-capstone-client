import React from 'react';
import MarkdownNotesContext from '../MarkdownNotesContext';
import Note from './Note';

class NoteUpdate extends React.Component { 
  static contextType = MarkdownNotesContext;

  render() {
    const note = this.context.getNote(this.props.match.params.id);
    if (note === "notfound") {
      return (
        <h2>Note not found.</h2>
      );
    }

    return <Note note={note}/>
  }
};

export default NoteUpdate;