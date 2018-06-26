const getIndexedEvent = rawEvent => {
  const timestamp = rawEvent.created_time;
  let title = "";
  let text = "";
  const link = rawEvent.permalink_url;
  let image_link = "";
  let media_link = "";

  if (rawEvent.full_picture) {
    image_link = rawEvent.full_picture;
  }

  switch (rawEvent.type) {
    case "status":
      if (rawEvent.place) {
        title = `You checked in at ${rawEvent.place.name}.`;
        text =
          rawEvent.message ||
          rawEvent.caption ||
          rawEvent.description ||
          `<strong>${rawEvent.place.name}</strong>
            ${rawEvent.place.street ? `, ${rawEvent.place.street}` : ""}
            ${rawEvent.place.city ? `, ${rawEvent.place.city}` : ""}`;
      } else {
        title = "You posted a status update on Facebook";
        text =
          rawEvent.message || rawEvent.caption || rawEvent.description || "";
      }

      break;

    case "photo":
      title =
        rawEvent.description ||
        rawEvent.name ||
        "You posted a picture on Facebook";
      text = rawEvent.message || "";
      break;

    case "link":
      title =
        rawEvent.description ||
        rawEvent.caption ||
        "You shared a link on Facebook";
      text = rawEvent.message || rawEvent.name || "Link";
      text = `<a href=${
        rawEvent.link
      } target="_blank" rel="noopener noreferrer">${text}</a>`;
      break;

    case "video":
      title =
        rawEvent.description ||
        rawEvent.caption ||
        rawEvent.name ||
        "You shared a video on Facebook";
      text = rawEvent.message || "";
      media_link = rawEvent.link || "";
      break;

    default:
  }

  return {
    timestamp,
    title,
    text,
    link,
    image_link,
    media_link
  };
};

module.exports = { getIndexedEvent };
