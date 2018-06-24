import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroller";
import "../styles/Lifeline.css";

class Lifeline extends React.Component {
  constructor(props) {
    super(props);
    this.api = {
      baseUrl: "/api/v1",
      queryParams: `?granularity=${props.granularity}s&num=7`
    };
  }

  render() {
    return (
      <div className="lifeline">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.loadMoreEvents}
          hasMore={true || false}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {Object.keys(this.props.events).map((date, index) => (
            <Card
              date={date}
              events={this.props.events[date]}
              granularity={this.props.granularity}
              isEven={index % 2 === 0}
              key={index}
              labels={this.props.labels}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

Lifeline.propTypes = {
  events: PropTypes.object.isRequired,
  granularity: PropTypes.string.isRequired,
  labels: PropTypes.object.isRequired,
  loadMoreEvents: PropTypes.func.isRequired
};

export default Lifeline;
