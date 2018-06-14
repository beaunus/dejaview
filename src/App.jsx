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
      events: {},
      filteredEvents: {},
      granularity: "day",
      labels: {},
      selectedDate: moment().format("YYYY-MM-DD")
    };
    this.changeDate = this.changeDate.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
    this.changeGranularity = this.changeGranularity.bind(this);
  }

  async componentDidMount() {
    await this.getEvents(this.state.selectedDate);
    this.setState({ filteredEvents: this.state.events });
  }

  async changeDate(selectedDate) {
    this.setState({ selectedDate });
    await this.getEvents(selectedDate);
    this.filterEvents();
  }

  async getEvents() {
    try {
      const events = (await axios.get(
        `/api/v1/${this.state.selectedDate}/?granularity=${
          this.state.granularity
        }s&num=7`
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

  async changeGranularity(granularity) {
    await this.setState({ granularity });
    await this.changeDate(this.state.selectedDate);
  }

  render() {
    return (
      <div className="App">
        <div className="header">Lifeline</div>
        <GranularitySelector
          granularity={this.state.granularity}
          changeGranularity={this.changeGranularity}
        />
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
        <Lifeline events={this.state.events} labels={this.state.labels} />
      </div>
    );
  }
}

export default App;
