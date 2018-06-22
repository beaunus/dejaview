import React, { Component } from "react";
import "./styles/App.css";
import Logo from "./components/Logo";
import Lifeline from "./components/Lifeline";
import DatePicker from "./components/DatePicker";
import Granularity from "./components/Granularity";
import LabelFilter from "./components/LabelFilter";
import NavArrows from "./components/NavArrows";
import axios from "axios";
import moment from "moment";
import FacebookLoginButton from "./components/FacebookLoginButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: {},
      granularity: "day",
      isLoggedIn: false,
      labels: {},
      selectedDate: moment().format("YYYY-MM-DD")
    };
    this.changeDate = this.changeDate.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
    this.changeGranularity = this.changeGranularity.bind(this);
  }

  async componentDidMount() {
    this.setState({
      events: await this.getEvents(
        this.state.selectedDate,
        this.state.granularity
      ),
      labels: await this.getInitialLabels()
    });
  }

  /**
   * Return a date-indexed object of all events with the given parameters.
   * @param {String} date
   * @param {String} granularity
   * @param {Number} num
   * @returns {Object}
   */
  async getEvents(date, granularity, num = 7) {
    try {
      const data = (await axios.get(
        `/api/v1/${date}/?granularity=${granularity}s&num=${num}`
      )).data;
      this.setState({ isLoggedIn: data.isLoggedIn });
      return data.events;
    } catch (error) {
      console.log(`Error getting data from API call.${error}`);
      throw error;
    }
  }

  /**
   * Return an object with all the initial labels set to true.
   * @returns {Object}
   */
  async getInitialLabels() {
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

  /**
   * Change the state to reflect the given selectedDate.
   * @param {String} selectedDate
   */
  async changeDate(selectedDate) {
    try {
      this.setState({
        events: await this.getEvents(selectedDate, this.state.granularity),
        selectedDate
      });
      const datePickerInput = document.getElementById("date-picker")
        .children[0];
      datePickerInput.value = this.state.selectedDate;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Change the state to reflect the given granularity.
   * @param {String} granularity
   */
  async changeGranularity(granularity) {
    this.setState({
      events: await this.getEvents(this.state.selectedDate, granularity),
      granularity
    });
  }

  /**
   * Toggle the selection of the given label filter.
   * @param {String} label
   */
  toggleLabel(label) {
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
        <div id="header">
          <Logo />

          <DatePicker
            selectedDate={this.state.selectedDate}
            changeDate={this.changeDate}
          />
          <Granularity
            granularity={this.state.granularity}
            changeGranularity={this.changeGranularity}
            navigateByGranularity={this.navigateByGranularity}
          />

          <div id="filter-container">
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
            {!this.state.isLoggedIn ? <FacebookLoginButton /> : ""}
          </div>
        </div>
        <NavArrows
          changeDate={this.changeDate}
          granularity={this.state.granularity}
          selectedDate={this.state.selectedDate}
        />
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
