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
      selectedDate: moment().format("YYYY-MM-DD"),
      events: {}
    };
    this.changeDate = this.changeDate.bind(this);
  }

  async componentDidMount() {
    const events = (await axios.get(`/api/v1/${this.state.selectedDate}`)).data;
    this.setState({ events });
  }

  async changeDate(selectedDate) {
    const events = (await axios.get(`/api/v1/${selectedDate}`)).data;
    this.setState({ selectedDate, events });
  }

  render() {
    return (
      <div className="App">
        <div className="header">Lifeline</div>
        <DatePicker
          selectedDate={this.state.selectedDate}
          changeDate={this.changeDate}
        />
        <LabelFilter labelName="New York Times" />
        <Lifeline events={this.state.events} />
      </div>
    );
  }
}

export default App;
