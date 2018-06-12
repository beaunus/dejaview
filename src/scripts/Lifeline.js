const toggleHidden = event => {
  const eventText = event.target.parentElement.parentElement.querySelector(
    ".event-text"
  );
  if (eventText.classList.contains("hidden")) {
    eventText.classList.remove("hidden");
  } else {
    eventText.classList.add("hidden");
  }
};

module.exports = { toggleHidden };
