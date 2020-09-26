import React, { Component } from "react";

export const emptyNote = {
  title: "",
  content: "",
  published: "",
};

const NoteContext = React.createContext({
  error: null,
  setError: () => {},
  clearError: () => {},
  setNote: () => {},
});

export default NoteContext;

export class NoteProvider extends Component {
  state = {
    error: null,
    note: emptyNote,
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setNote = (note) => {
    this.setState({ note });
  };

  clearNote = () => {
    this.setNote(emptyNote);
  };

  render() {
    const value = {
      note: this.state.note,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setNote: this.setNote,
      clearNote: this.clearNote,
    };
    return (
      <NoteContext.Provider value={value}>
        {this.props.children}
      </NoteContext.Provider>
    );
  }
}
