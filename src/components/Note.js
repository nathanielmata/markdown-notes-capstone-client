import React from 'react';
import MarkdownNotesContext from '../MarkdownNotesContext';
import { LockIcon, MarkdownIcon, FileIcon } from './Icons';
import mdParser from "../mdParser";

class Note extends React.Component { 
  static contextType = MarkdownNotesContext;

  state = {
    title: "",
    content: "",
    markup: "",
  };

  componentDidMount = () => {
    const note = this.props.note;
    this.setState({
      title: note.title,
      content: note.content,
    });
    
    this.generatePreview(note.content);
  };

  replacer = (content) => {
    const arr = content.split("\n");
    return arr.map((str) => {
      let match = mdParser.headingMatch(str);
      match = mdParser.codeBlockMatch(match);

      return match;
    });
  };

  generatePreview = (content) => {
    const markup = this.replacer(content).join("");
    this.setState({
      content,
      markup,
    });
  };

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState({
      title
    });

  }

  handleEditorChange = (e) => {
    const content = e.target.value;
    this.generatePreview(content);
  };

  render() {

    return (
      <div className="editor__wrapper">
        <div className="editor__above">
          <div className="editor__title">
            <div className="editor__title--label">TITLE</div>
            <input
              className="editor__title--input"
              value={this.state.title}
              onChange={(e) => this.handleTitleChange(e)}
              type="text" />
          </div>
          <div className="editor__buttons">
            <button><LockIcon /></button>
            <button><MarkdownIcon /></button>
            <button><FileIcon /></button>
          </div>
        </div>
        <div id="editor" className="editor--split main--split">
          <div className="editor--inner">
            <textarea
              className="editor--textarea"
              value={this.state.content}
              onChange={(e) => this.handleEditorChange(e)}
            ></textarea>
          </div>
        </div>
      
        <div id="preview" className="preview--split main--split">
          <div
            className="preview--inner"
            dangerouslySetInnerHTML={{ __html: this.state.markup }}
          />
        </div>
      </div>
    )};
  }

export default Note;