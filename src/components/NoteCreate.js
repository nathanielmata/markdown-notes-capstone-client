import React from "react";
import Note from "./Note";

const NoteCreate = () => <Note note={newNote()} />;
export default NoteCreate;

const newNote = () => {
  return {
    title: "Untitled",
    content: "# Create a new note",
  };
};