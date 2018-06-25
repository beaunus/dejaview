import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroller";
import "../styles/Lifeline.css";

const Lifeline = props => (
  <div className="lifeline">
    <InfiniteScroll
      hasMore={props.hasMore}
      initialLoad={false}
      loader={<Loader labels={props.labels} key={0} />}
      loadMore={props.loadMoreEvents}
      pageStart={0}
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
  hasMore: PropTypes.bool.isRequired,
  labels: PropTypes.object.isRequired,
  loadMoreEvents: PropTypes.func.isRequired
};

export default Lifeline;
