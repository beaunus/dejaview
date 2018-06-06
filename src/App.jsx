import React, { Component } from "react";
import "./styles/App.css";
import Lifeline from "./components/Lifeline.jsx";
import DatePicker from "./components/DatePicker.jsx";
import data from "./data";
import LabelFilter from "./components/LabelFilter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: data
    };
    this.changeDate = this.changeDate.bind(this);
  }

  changeDate(date) {
    const strDate = date.replace(/-/g, "");
    const nextDay = Number(strDate) - 1;
    if (data[strDate] !== undefined && data[nextDay.toString()] !== undefined) {
      const events = {};
      events[strDate] = data[strDate];
      events[nextDay.toString()] = data[nextDay.toString()];
      this.setState({ events });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="header">Lifeline</div>
        <DatePicker changeDate={this.changeDate} />
        <LabelFilter />
        <Lifeline events={this.state.events} />
      </div>
    );
  }
}

export default App;
