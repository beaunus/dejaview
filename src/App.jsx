import React, { Component } from "react";
import "./styles/App.css";
import Lifeline from "./components/Lifeline.jsx";
import DatePicker from "./components/DatePicker.jsx";
import GranularitySelector from "./components/GranularitySelector.jsx";
import axios from "axios";
import LabelFilter from "./components/LabelFilter";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment().format("YYYY-MM-DD"),
      events: {},
      filteredEvents: {},
      labels: {}
    };
    this.changeDate = this.changeDate.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
  }

  async componentDidMount() {
    await this.getEvents(this.state.selectedDate);
    this.setState({ filteredEvents: this.state.events });
  }

  async changeDate(selectedDate) {
    await this.getEvents(selectedDate);
    this.filterEvents();
  }

  async getEvents(selectedDate) {
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
      console.log("Error getting data from API call.");
    }
  }

  async toggleLabel(label, div) {
    const labels = this.state.labels;
    if (labels[label]) {
      labels[label] = false;
      div.classList.add("label-fade");
    } else {
      labels[label] = true;
      div.classList.remove("label-fade");
    }
    this.setState({ labels });
    this.filterEvents();
  }

  filterEvents() {
    const filteredEvents = {};
    const eventDateKeys = Object.keys(this.state.events);
    eventDateKeys.forEach(dateKey => {
      const event = {};
      const eventDateLabelKeys = Object.keys(this.state.events[dateKey]);
      eventDateLabelKeys.forEach(labelKey => {
        if (
          this.state.labels.hasOwnProperty(labelKey) &&
          this.state.labels[labelKey] === true
        ) {
          event[labelKey] = this.state.events[dateKey][labelKey];
        }
      });
      filteredEvents[dateKey] = event;
    });
    this.setState({ filteredEvents });
  }

  render() {
    return (
      <div className="App">
        <div className="header">Lifeline</div>
        <GranularitySelector />
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
                filtered={!this.state.labels[label]}
              />
            );
          })}
        </div>
        <Lifeline events={this.state.filteredEvents} />
      </div>
    );
  }
}

export default App;
