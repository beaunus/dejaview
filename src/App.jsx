import React, { Component } from "react";
import "./styles/App.css";
import Lifeline from "./components/Lifeline.jsx";
import DatePicker from "./components/DatePicker.jsx";
import axios from "axios";
import LabelFilter from "./components/LabelFilter";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: undefined,
      events: {}
    };
    this.changeDate = this.changeDate.bind(this);
  }

  async componentDidMount() {
    const selectedDate = moment().format("YYYY-MM-DD");
    const events = (await axios.get(`/api/v1/${selectedDate}`)).data;

    this.setState({ selectedDate, events });
  }

  changeDate(date) {
    // const nextDay = Number(date) - 1;
    // if (data[strDate] !== undefined && data[nextDay.toString()] !== undefined) {
    //   const events = {};
    //   events[date] = data[date];
    //   events[nextDay.toString()] = data[nextDay.toString()];
    //   this.setState({ selectedDate: date, events });
    // }
  }

  render() {
    return (
      <div className="App">
        <div className="header">Lifeline</div>
        <DatePicker changeDate={this.changeDate} />
        <LabelFilter labelName="New York Times" />
        <Lifeline events={this.state.events} />
      </div>
    );
  }
}

export default App;
