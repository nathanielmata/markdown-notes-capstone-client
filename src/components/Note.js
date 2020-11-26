import React from "react";
import NoteContext from "../context/NoteContext";
import NoteApiService from "../services/note-api-service";
import { LockIcon, SaveIcon } from "./Icons";
import MdParser from "../utils/md-parser";

class Note extends React.Component {
  static contextType = NoteContext;

  state = {
    title: "",
    content: "",
    markup: "",
  };

  componentDidMount = () => {
    this.handleMarkup(this.handleLoading());
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.note.id !== prevProps.note.id) {
      this.handleMarkup(this.handleLoading());
    }
  };

  handleParsing = (content) => {
    return MdParser.parse(content);
  };

  handleLoading = () => {
    const { note } = this.props;
    this.setState({
      title: note.title,
      content: note.content,
    });
    return note.content;
  };

  handleMarkup = (content) => {
    const markup = this.handleParsing(content).join("");
    this.setState({
      markup,
    });
  };

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState({
      title,
    });
  };

  handleEditorChange = (e) => {
    const content = e.target.value;
    this.setState({
      content,
    });
    this.handleMarkup(content);
  };

  // saveIndicator() {
  //   let el = document.getElementById("editor__saved--alert");
  //   for (let i = 0; i < 3; i++) {

  //   }
  // }

  updateContext = (note) => {
    this.context.setNote(note);
    this.props.history.push(`/note/${note.id}`);
  }

  patchNote = (id, title, content) => {
    NoteApiService.patchNote(id, title, content)
    .then((note) => {
      this.updateContext(note);
      this.props.updateNote(note);
    })
    .catch(this.context.setError);
  }

  postNote = (title, content) => {
    NoteApiService.postNote(title, content)
    .then((note) => {
      this.updateContext(note);
      this.props.addNote(note);
    })
    .catch(this.context.setError);
  }

  handleSubmit = event => {
    event.preventDefault();

    const id = this.props.match.params.id ?? null;
    const { title, content } = this.state;

    if (id) {
      this.patchNote(id, title, content)
    } else {
      this.postNote(title, content)
    }
  }

  render() {
    const { title, content, markup } = this.state;
    return (
      <div className="editor__wrapper">
        <div className="editor__above">
          <div id="editor__saved--alert" className="editor__saved--alert">...Saving</div>
          <div className="editor__title">
            <h5 className="editor__title--label label">TITLE</h5>
            <input
              className="editor__title--input"
              title={title}
              value={title}
              onChange={(e) => this.handleTitleChange(e)}
              type="text"
            />
          </div>
          <div className="editor__buttons">
            <button onClick={(e) => this.handleSubmit(e)}>
              <SaveIcon />
            </button>
            <button>
              <LockIcon />
            </button>
            {/* <button>
              <MarkdownIcon />
            </button> */}
            {/* <button>
              <FileIcon />
              <span className="tooltip">Export</span>
            </button> */}
          </div>
        </div>
        <div className="editor__inner">
          <div id="editor" className="editor--split main--split">
            <div className="editor--inner">
              <textarea
                className="editor--textarea"
                value={content}
                onChange={(e) => this.handleEditorChange(e)}
              ></textarea>
            </div>
          </div>

          <div id="preview" className="preview--split main--split">
            <div
              className="preview--inner"
              dangerouslySetInnerHTML={{ __html: markup }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
