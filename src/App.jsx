import React, { Component } from "react";
import "./styles/App.css";
import Lifeline from "./components/Lifeline.jsx";
import DatePicker from "./components/DatePicker.jsx";
import Granularity from "./components/Granularity.jsx";
import axios from "axios";
import LabelFilter from "./components/LabelFilter";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: {},
      granularity: "day",
      labels: {},
      selectedDate: moment().format("YYYY-MM-DD")
    };
    this.changeDate = this.changeDate.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
    this.changeGranularity = this.changeGranularity.bind(this);
    this.navigateByGranularity = this.navigateByGranularity.bind(this);
  }

  async componentDidMount() {
    await this.updateEvents(this.state.selectedDate);
    this.updateLabels();
  }

  updateLabels() {
    const labels = { ...this.state.labels };
    for (const eventDate in this.state.events) {
      const labelKeys = this.state.events[eventDate];
      for (const labelKey in labelKeys) {
        if (!labels.hasOwnProperty(labelKey)) {
          labels[labelKey] = true;
        }
      }
    }
    this.setState({ labels });
  }

  async changeDate(selectedDate) {
    await this.setState({ selectedDate });
    await this.updateEvents();
  }

  navigateByGranularity(direction) {
    console.log(direction);
    this.setState({ selectedDate: moment().format("YYYY-MM-DD") });
    this.updateEvents();
  }

  async updateEvents() {
    try {
      const events = (await axios.get(
        `/api/v1/${this.state.selectedDate}/?granularity=${
          this.state.granularity
        }s&num=7`
      )).data;
      this.setState({ events });
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
  }

  async changeGranularity(granularity) {
    await this.setState({ granularity });
    await this.changeDate(this.state.selectedDate);
  }

  render() {
    return (
      <div className="App">
        <div className="header">Lifeline</div>
        <Granularity
          granularity={this.state.granularity}
          changeGranularity={this.changeGranularity}
          navigateByGranularity={this.navigateByGranularity}
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
