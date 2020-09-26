import React, { Component } from 'react'

const NoteListContext = React.createContext({
  notes: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setNotes: () => {},
})
export default NoteListContext

export class NoteListProvider extends Component {
  state = {
    notes: [],
    error: null,
  };

  getNotes = () => {
    return this.state.notes;
  }

  setNotes = notes => {
    this.setState({ notes })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      notes: this.state.notes,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setNotes: this.setNotes,
      getNotes: this.getNotes,
    }
    return (
      <NoteListContext.Provider value={value}>
        {this.props.children}
      </NoteListContext.Provider>
    )
  }
}
