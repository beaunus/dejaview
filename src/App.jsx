import React, { Component } from "react";
import "./styles/App.css";
import Lifeline from "./components/Lifeline.jsx";
import DatePicker from "./components/DatePicker.jsx";
import Granularity from "./components/Granularity.jsx";
import LabelFilter from "./components/LabelFilter";
import { offsetDate } from "../src/utilities";
import axios from "axios";
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
    this.setState({
      events: await this.getEvents(
        this.state.selectedDate,
        this.state.granularity
      ),
      labels: await this.getLabels()
    });
  }

  async getEvents(date, granularity, num = 7) {
    try {
      return (await axios.get(
        `/api/v1/${date}/?granularity=${granularity}s&num=${num}`
      )).data;
    } catch (error) {
      console.log(`Error getting data from API call.${error}`);
    }
  }

  async getLabels() {
    try {
      const labelNames = (await axios.get(`/api/v1/labels`)).data;
      return labelNames.reduce((acc, label) => {
        acc[label] = true;
        return acc;
      }, {});
    } catch (error) {
      console.log(`Error getting data from API call.${error}`);
    }
  }

  async changeDate(selectedDate) {
    this.setState({
      events: await this.getEvents(selectedDate, this.state.granularity),
      selectedDate
    });
  }

  async navigateByGranularity(direction, granularity) {
    const num = direction === "left" ? -1 : 1;
    const newDate = offsetDate(this.state.selectedDate, granularity, num);
    const newDateString = moment(newDate).format("YYYY-MM-DD");
    const datePickerInput = document.getElementById("date-picker").children[0];
    datePickerInput.value = newDateString;
    this.setState({
      events: await this.getEvents(newDateString, this.state.granularity),
      selectedDate: newDateString
    });
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
    this.setState({
      events: await this.getEvents(this.state.selectedDate, granularity),
      granularity
    });
  }

  render() {
    return (
      <div className="App">
        <div className="header">Déjà View</div>
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
        <Lifeline
          events={this.state.events}
          granularity={this.state.granularity}
          labels={this.state.labels}
        />
      </div>
    );
  }
}

export default App;
