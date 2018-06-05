import React, { Component } from "react";
import "./App.css";
import Lifeline from "./components/Lifeline.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "This is a prop",
      events: []
    };
  }
  render() {
    return (
      <div className="App">
        <Lifeline title={this.state.title} />
      </div>
    );
  }
}

export default App;
