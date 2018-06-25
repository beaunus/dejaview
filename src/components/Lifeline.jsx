import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import Felix from "./Felix";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroller";
import "../styles/Lifeline.css";

const Lifeline = props => {
  let someLabelsAreSelected = false;
  Object.keys(props.labels).map(
    label => (someLabelsAreSelected |= props.labels[label])
  );

  if (Object.keys(props.labels).length > 0 && !someLabelsAreSelected) {
    return (
      <Felix
        quote="I&apos;m gonna need you to go ahead and not un-select all of the data
    source filters."
      />
    );
  }
  return (
    <div className="lifeline">
      <InfiniteScroll
        hasMore={props.hasMore}
        loader={
          <Loader hasMore={props.hasMore} labels={props.labels} key={0} />
        }
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
};

Lifeline.propTypes = {
  events: PropTypes.object.isRequired,
  granularity: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
  labels: PropTypes.object.isRequired,
  loadMoreEvents: PropTypes.func.isRequired
};

export default Lifeline;
