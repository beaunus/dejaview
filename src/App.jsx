import React, { Component } from "react";
import "./styles/App.css";
import Lifeline from "./components/Lifeline.jsx";
import DatePicker from "./components/DatePicker.jsx";
// eslint-disable-next-line
import data from "./data_now";
// eslint-disable-next-line
import data_old from "./data_old";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: data
    };
    this.changeDate = this.changeDate.bind(this);
  }

  changeDate(date) {
    console.log(date);
    this.setState({ events: data_old });
  }

  render() {
    return (
      <div className="App">
        <div className="header">Lifeline</div>
        <DatePicker changeDate={this.changeDate} />
        <Lifeline events={this.state.events} />
      </div>
    );
  }
}

export default App;
