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
      events: {},
      labels: {}
    };
    this.changeDate = this.changeDate.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
  }

  async componentDidMount() {
    try {
      const events = (await axios.get(
        `/api/v1/${this.state.selectedDate}/?num=7`
      )).data;
      const labels = {};
      const dateKeys = Object.keys(events);
      dateKeys.forEach(dateKey => {
        const labelKeys = Object.keys(events[dateKey]);
        labelKeys.forEach(labelKey => {
          if (!labels.hasOwnProperty(labelKey)) {
            labels[labelKey] = true;
          }
        });
      });
      this.setState({ events, labels });
    } catch (error) {
      console.log("Error getting initial State from API call.");
    }
  }

  async changeDate(selectedDate) {
    try {
      const events = (await axios.get(`/api/v1/${selectedDate}/?num=7`)).data;
      const labels = {};
      const dateKeys = Object.keys(events);
      dateKeys.forEach(dateKey => {
        const labelKeys = Object.keys(events[dateKey]);
        labelKeys.forEach(labelKey => {
          if (!labels.hasOwnProperty(labelKey)) {
            labels[labelKey] = true;
          }
        });
      });
      this.setState({ selectedDate, events, labels });
    } catch (error) {
      console.log("Error getting data from API call on date change.");
    }
  }

  async toggleLabel(label) {
    const labels = this.state.labels;
    if (labels[label]) {
      labels[label] = false;
    } else {
      labels[label] = true;
    }
    this.setState({ labels });
  }

  render() {
    return (
      <div className="App">
        <div className="header">Lifeline</div>
        <DatePicker
          selectedDate={this.state.selectedDate}
          changeDate={this.changeDate}
        />
        <div className="filter-container">
          {Object.keys(this.state.labels).map((label, index) => {
            return (
              <LabelFilter
                key={index}
                labelName={label}
                toggleLabel={this.toggleLabel}
              />
            );
          })}
        </div>
        <Lifeline events={this.state.events} />
      </div>
    );
  }
}

export default App;
