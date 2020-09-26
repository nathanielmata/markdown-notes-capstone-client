import React from "react";
import NoteContext from "../context/NoteContext";
import NoteApiService from "../services/note-api-service";
import TokenService from "../services/token-service";
import Note from "./Note";

class NoteUpdate extends React.Component {
  static contextType = NoteContext;

  componentDidMount() {
    this.getNote();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getNote();
    }
  };

  componentWillUnmount() {
    this.context.clearNote();
  }

  getNote = () => {
    const id = this.props.match.params.id;
    this.context.clearError();

    NoteApiService.getNote(id)
      .then((note) => this.context.setNote(note))
      .catch((err) => this.context.setError(err));
  };

  render() {
    const { error, note } = this.context;
    if (error) {
      return (error === `Note doesn't exist`)
        ? <h2>Note not found.</h2>
        : <h2>There was an error</h2>
    }
    return (
      <>
      {TokenService.getAuthToken()
        ? <Note note={note} {...this.props} />
        : this.props.history.push('/login')
      }
      </>
    )
  }
}

export default NoteUpdate;
