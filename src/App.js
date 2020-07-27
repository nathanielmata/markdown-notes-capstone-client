import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    inputTxt: "",
    htmlOut: ""
  }

  headingMatch = (str) => {
    const match = str.match(/\n*#+\s+.+\n*/g);
    if (match) {
      const matchStr = match[0];
      const level = matchStr.match(/#+/)[0].length;
      str = `
        <h${level}>
          ${matchStr.replace(/#+/, "").trim()}
        </h${level}>
        `;
    }
    return str;
  }

  codeBlockMatch = (str) => {
    const match = str.match(/`{3}\n*.*\n*/g);
    if (match) {
      const matchStr = match[0];
      str = `<pre><code>${matchStr.replace(/`{3}\n*/g, "").trim()}</code></pre>`;
    }
    return str;
  }

  replacer = (inputTxt) => {
    const inputArr = inputTxt.split('\n');
    return inputArr.map(str => {

      let match = this.headingMatch(str);
          match = this.codeBlockMatch(match);


      return match;
    })
  }

  handleChange = (e) => {
    const inputTxt = e.target.value;
    const htmlOut = this.replacer(inputTxt).join("");

    this.setState({
      inputTxt,
      htmlOut
    })
  }

  render() {
      return (
        <div className="App">
          <header className="App-header">
            Markdown Notes
          </header>
          
          <main className="main--container">

            <div id="editor" className="editor--split main--split">
              <div className="editor--inner">
                <textarea
                  className="editor--textarea"
                  value={this.state.txtIn}
                  onChange={(e) => this.handleChange(e)}></textarea>
              </div>
            </div>

            <div id="preview" className="preview--split main--split">
              <div
                className="preview--inner"
                dangerouslySetInnerHTML={{__html: this.state.htmlOut}} />
            </div>

          </main>
        </div>
      );
  }
}

export default App;
