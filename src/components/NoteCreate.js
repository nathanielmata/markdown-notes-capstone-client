import React from "react";
import Note from "./Note";

const NoteCreate = (props) => <Note note={newNote()} {...props} />;
export default NoteCreate;

const newNote = () => {
  return {
    title: "Untitled",
    content: "# Create a new note",
  };
};