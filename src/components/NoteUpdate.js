import React from 'react';
import NoteApiService from '../services/note-api-service';
import Note from './Note';

class NoteUpdate extends React.Component {
  
  state = {
    err: null,
    note: {
      title: "",
      content: "",
      published: "",
    },
  };

  componentDidMount() {
    this.getNote();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getNote();
    }
  };

  getNote() {
    const id = this.props.match.params.id;
    NoteApiService.getNote(id)
      .then((note) => {
        this.setState({
          err: null,
          note,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ err });
      });
  }

  render() {
    if (this.state.err !== null) {
      return <h2>Note not found.</h2>;
    }

    return <Note note={this.state.note} />;
  }
};

export default NoteUpdate;