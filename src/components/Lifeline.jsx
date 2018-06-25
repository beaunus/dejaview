import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroller";
import "../styles/Lifeline.css";

const Lifeline = props => (
  <div className="lifeline">
    <InfiniteScroll
      pageStart={0}
      loadMore={props.loadMoreEvents}
      hasMore={true || false}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
      threshold={1000}
    >
      {Object.keys(props.events).map((date, index) => (
        <Card
          date={date}
          events={props.events[date]}
          granularity={props.granularity}
          isEven={index % 2 === 0}
          key={index}
          labels={props.labels}
        />
      ))}
    </InfiniteScroll>
  </div>
);

Lifeline.propTypes = {
  events: PropTypes.object.isRequired,
  granularity: PropTypes.string.isRequired,
  labels: PropTypes.object.isRequired,
  loadMoreEvents: PropTypes.func.isRequired
};

export default Lifeline;
