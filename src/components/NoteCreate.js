import React from "react";
import Note from "./Note";

const NoteCreate = (props) => <Note {...props} />;

export default NoteCreate;

NoteCreate.defaultProps = {
  note: {
    title: "Untitled",
    content: "# Create a new note",
  }
};