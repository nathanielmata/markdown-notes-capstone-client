import React from "react";
import NoteContext from "../context/NoteContext";
import NoteApiService from "../services/note-api-service";
import { SaveIcon, CloseIcon, DeleteIcon, SpinnerIcon } from "./Icons";
import MdParser from "../utils/md-parser";

class Note extends React.Component {
	static contextType = NoteContext;

	state = {
		title: '',
		content: '',
		markup: '',
		success: '',
	};

	componentDidMount = () => {
		this.handleMarkup(this.handleLoading());
	};

	componentDidUpdate = (prevProps) => {
		if (this.props.note.id !== prevProps.note.id) {
			this.handleMarkup(this.handleLoading());
		}
	};

	updateContext = (note) => {
		this.context.setNote(note);	
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
		const markup = this.handleParsing(content).join('');
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

	handleSubmit = (event) => {
		event.preventDefault();
		const id = this.props.match.params.id ?? null;
		const { title, content } = this.state;

		if (id) {
			this.patchNote(id, title, content);
		} else {
			this.postNote(title, content);
		}
  };
  
  postNote = (title, content) => {
		this.setState({ success: 'Creating new note' }, () => {
			this.showSaveAlert();
    });

		NoteApiService.postNote(title, content)
			.then((note) => {
        this.updateContext(note);
				this.props.addNote(note);
				this.showSaveAlert(note);
			})
			.catch((error) => {
				const err = JSON.stringify(error.error);
				this.context.setError(`${err} Could not create the note`);
			});
  };

	patchNote = (id, title, content) => {
		this.setState({ success: 'Updating your note' }, () => {
			this.showSaveAlert();
		});

		NoteApiService.patchNote(id, title, content)
			.then((note) => {
				this.updateContext(note);
				this.props.updateNote(note);
				this.showSaveAlert(note);
			})
			.catch((error) => {
				const err = JSON.stringify(error.error);
				this.context.setError(`${err} Could not update the note`);
			});
	};
  
  deleteNote = () => {
    const id = this.props.match.params.id
		this.setState({ success: 'Deleting note' }, () => {
			this.showDeleteAlert();
		});

		NoteApiService.deleteNote(id)
			.then((res) => {
				this.props.deleteNote(id);
        this.showDeleteAlert();
			})
			.catch((error) => {
				const err = JSON.stringify(error.error);
				this.context.setError(`${err} Could not delete the note`);
			});
  };
  
  showDeleteAlert = () => {
		// this is the element that displays our save indicator
		const element = document.getElementById('editor__save--alert');

    // clear the saving indicator after 2sec of displaying it
    // or if error is shown on click of x
		if (element.classList.contains('visible') && this.context.error === null) {
			const saveDelay = setTimeout(() => {
        element.classList.toggle('visible');
        this.props.history.push(`/dashboard`);
				clearTimeout(saveDelay);
			}, 2000);
			return;
		} else if (this.context.error !== null) {
      this.context.clearError();
      element.classList.toggle('visible');
      return;
    }

		// show the saving indicator when save button clicked
		element.classList.toggle('visible');
		return;
  };

	showSaveAlert = (note) => {
		// this is the element that displays our save indicator
		const element = document.getElementById('editor__save--alert');

    // clear the saving indicator after 2sec of displaying it
    // or if error is shown on click of x
		if (element.classList.contains('visible') && this.context.error === null) {
			const saveDelay = setTimeout(() => {
        element.classList.toggle('visible');
        this.props.history.push(`/note/${note.id}`);
				clearTimeout(saveDelay);
			}, 2000);
			return;
		} else if (this.context.error !== null) {
      this.context.clearError();
      element.classList.toggle('visible');
      return;
    }

		// show the saving indicator when save button clicked
		element.classList.toggle('visible');
		return;
  };
  
  renderSaveAlert = () => {
    if (this.context.error === null) {
      return (
        <>
          <div>{this.state.success} &nbsp;&nbsp;&nbsp;</div>
          <SpinnerIcon classVariant='editor__save--spinner rotate-center' />
        </>
      );
    } else {
      return (
				<>
					<div className='editor__save--error' onClick={() => this.showSaveAlert()}>
						<div>{this.context.error}</div>
						<div className='editor__save--error-close'>
							<CloseIcon />
						</div>
					</div>
				</>
			);
    }
	};

	render() {
    const { title, content, markup } = this.state;
    const id = this.props.match ? this.props.match.params.id : null;
		return (
			<div className='editor__wrapper'>
				<div className='editor__above'>
					<div className='editor__title'>
						<h5 className='editor__title--label label'>TITLE</h5>
						<input
							className='editor__title--input'
							title={title}
							value={title}
							onChange={(e) => this.handleTitleChange(e)}
							type='text'
						/>
					</div>

					<div id='editor__save--alert' className='editor__save--alert'>
						<div className='editor__save--alert-inner'>{this.renderSaveAlert()}</div>
					</div>

					<div className='editor__buttons'>
						<button onClick={(e) => this.handleSubmit(e)}>
							<SaveIcon />
						</button>
            { id && 
              <button onClick={() => this.deleteNote()}>
                <DeleteIcon />
              </button>
            }
					</div>
				</div>
				<div className='editor__inner'>
					<div id='editor' className='editor--split main--split'>
						<div className='editor--inner'>
							<textarea
								className='editor--textarea'
								value={content}
								onChange={(e) => this.handleEditorChange(e)}></textarea>
						</div>
					</div>

					<div id='preview' className='preview--split main--split'>
						<div className='preview--inner' dangerouslySetInnerHTML={{ __html: markup }} />
					</div>
				</div>
			</div>
		);
	}
}

export default Note;

Note.defaultProps = {
  note: {
    title: "Untitled",
    content: "# Create a new note",
  }
};
