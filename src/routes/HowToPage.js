import React, { Component } from "react";
import MdSyntaxGuide from "../components/MdSyntaxGuide";

export default class HowToPage extends Component {
  render() {
    return (
      <div className="how__to">
        <h1>Syntax Guide</h1>
        <h4>A quick overview of our basic Markdown syntax support. These are most of the elements outlined in John Gruber’s original design document.</h4>
        <MdSyntaxGuide />
      </div>
    );
  }
}
