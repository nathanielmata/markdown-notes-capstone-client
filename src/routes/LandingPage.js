import React, { Component } from "react";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing">
        <h1>Markdown Notes</h1>
        <h4>Create and save notes in Markdown right in your browser</h4>
        <a href="/login" className="button" >Try for free</a>
      </div>
    );
  }
}
