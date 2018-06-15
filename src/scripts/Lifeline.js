const toggleHidden = event => {
  const eventMore = event.target.parentElement.parentElement.querySelector(
    ".event-more"
  );
  if (eventMore.classList.contains("hidden")) {
    eventMore.classList.remove("hidden");
  } else {
    eventMore.classList.add("hidden");
  }
};

module.exports = { toggleHidden };
