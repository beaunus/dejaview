import React, { Component } from "react";
import "./styles/App.css";
import Header from "./components/Header.jsx";
import Lifeline from "./components/Lifeline.jsx";
import Footer from "./components/Footer";
import { offsetDate } from "../src/utilities";
import axios from "axios";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    const granularity = "day";
    const numGrainsPerRequest = 20;
    this.state = {
      events: {},
      granularity,
      hasMore: true,
      numGrainsPerRequest,
      isLoggedIn: false,
      labels: {},
      selectedDate: moment().format("YYYY-MM-DD"),
      prevDate: moment().format("YYYY-MM-DD")
    };
    this.changeDate = this.changeDate.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
    this.changeGranularity = this.changeGranularity.bind(this);
    this.loadMoreEvents = this.loadMoreEvents.bind(this);
  }

  async componentDidMount() {
    this.setState({
      isLoggedIn: await this.isLoggedIn(),
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
  async getEvents(
    date,
    granularity = this.state.granularity,
    num = this.state.numGrainsPerRequest
  ) {
    try {
      return (await axios.get(
        `/api/v1/${date}/?granularity=${granularity}s&num=${num}`
      )).data;
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
   * Return whether or not the user is currently logged in.
   *
   * @returns {Boolean}
   */
  async isLoggedIn() {
    try {
      return (await axios.get(`/api/v1/isLoggedIn`)).data;
    } catch (error) {
      console.log(`Error getting data from API call.${error}`);
    }
  }

  /**
   * Change the state to reflect the given selectedDate.
   * @param {String} selectedDate
   */
  async changeDate(selectedDate) {
    const prevDate = moment(
      offsetDate(
        selectedDate,
        this.state.granularity,
        -this.state.numGrainsPerRequest
      )
    ).format("YYYY-MM-DD");
    try {
      this.setState({
        events: {},
        selectedDate,
        prevDate,
        hasMore: moment(prevDate).isAfter(moment("1000-01-01"))
      });
      const datePickerInput = document.getElementById("date-picker")
        .children[0];
      datePickerInput.value = this.state.selectedDate;
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Change the state to reflect the given granularity.
   * @param {String} granularity
   */
  async changeGranularity(granularity) {
    const prevDate = moment(
      offsetDate(
        this.state.selectedDate,
        granularity,
        -this.state.numGrainsPerRequest
      )
    ).format("YYYY-MM-DD");
    this.setState({
      events: {},
      granularity,
      prevDate,
      hasMore: moment(prevDate).isAfter(moment("1000-01-01"))
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

  /**
   * Load more events onto the bottom of the Lifeline.
   */
  async loadMoreEvents() {
    let someLabelsAreSelected = false;
    Object.keys(this.state.labels).map(
      label => (someLabelsAreSelected |= this.state.labels[label])
    );
    if (Object.keys(this.state.labels).length < 1 || !someLabelsAreSelected) {
      return;
    }
    try {
      const newEvents = await this.getEvents(this.state.prevDate);
      const prevDate = moment(
        offsetDate(
          this.state.prevDate,
          `${this.state.granularity}s`,
          -this.state.numGrainsPerRequest
        )
      ).format("YYYY-MM-DD");
      this.setState({
        events: { ...this.state.events, ...newEvents },
        prevDate,
        hasMore: moment(prevDate).isAfter(moment("1000-01-01"))
      });
    } catch (error) {
      console.log(`Error getting data from API call.${error}`);
      throw error;
    }
  }

  render() {
    return (
      <div className="App">
        <Header
          changeDate={this.changeDate}
          changeGranularity={this.changeGranularity}
          granularity={this.state.granularity}
          isLoggedIn={this.state.isLoggedIn}
          labels={this.state.labels}
          selectedDate={this.state.selectedDate}
          toggleLabel={this.toggleLabel}
        />
        <Lifeline
          events={this.state.events}
          granularity={this.state.granularity}
          hasMore={this.state.hasMore}
          labels={this.state.labels}
          loadMoreEvents={this.loadMoreEvents}
          nextHref={this.state.nextHref}
          selectedDate={this.state.selectedDate}
        />
        {Object.keys(this.state.events).length > 0 ? <Footer /> : ""}
      </div>
    );
  }
}

export default App;
