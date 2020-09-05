import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { LockIcon, MarkdownIcon, FileIcon } from './components/Icons';
import NOTES from './seeds/seeds.notes';

import mdParser from "./mdParser";
import "./App.css"; 

class App extends React.Component {
  state = {
    noteTitle: NOTES[0].title,
    inputTxt: NOTES[0].content,
    htmlOut: "",
    menus: {
      sidebar: false,
      user: false,
    }
  };

  componentDidMount = () => {
    this.generatePreview(this.state.inputTxt);
  }

  toggleHiddenMenu = (name) => {
    this.setState((state) => {
      // toggle the clicked menu and close other menus we are tracking with state
      const menus = {};
      Object.keys(state.menus).forEach((k) => {
        name === k
          ? menus[k] = !this.state.menus[k]
          : menus[k] = false;
      })
      return {menus: {...menus}};
    });

  }

  replacer = (inputTxt) => {
    const inputArr = inputTxt.split("\n");
    return inputArr.map((str) => {
      let match = mdParser.headingMatch(str);
      match = mdParser.codeBlockMatch(match);

      return match;
    });
  };

  generatePreview = (inputVal) => {
    const inputTxt = inputVal;
    const htmlOut = this.replacer(inputTxt).join("");
    this.setState({
      inputTxt,
      htmlOut,
    });
  };

  handleTitleChange = (e) => {
    const titleTxt = e.target.value;
    console.log(titleTxt);
    this.setState({
      noteTitle: titleTxt
    });

  }

  handleChange = (e) => {
    const inputTxt = e.target.value;
    this.generatePreview(inputTxt);
  };

  render() {
    const full_name = {name: "Nathaniel Mata"}
    const { sidebar, user } = {...this.state.menus}
    return (
      <div className="App">
        <BrowserRouter>        
          <Header 
            menus={{ sidebar, user }}
            toggleHiddenMenu={this.toggleHiddenMenu}
            user={full_name} >
              { this.state.menus.sidebar &&
                <Sidebar 
                  notes={NOTES}
                  toggleHiddenMenu={this.toggleHiddenMenu} />
              }
            </Header>

          <main className="main--container">
            <div className="editor__wrapper">
              <div className="editor__above">
                <div className="editor__title">
                  <div className="editor__title--label">TITLE</div>
                  <input
                    className="editor__title--input"
                    value={this.state.noteTitle}
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
                    value={this.state.inputTxt}
                    onChange={(e) => this.handleChange(e)}
                  ></textarea>
                </div>
              </div>

              <div id="preview" className="preview--split main--split">
                <div
                  className="preview--inner"
                  dangerouslySetInnerHTML={{ __html: this.state.htmlOut }}
                />
              </div>
            </div>
          </main>
          {/* <footer>Contact details</footer> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
