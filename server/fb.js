/**
 *
 * status - regular
 * status - place
 * link
 * video
 * photo
 *
 *
 */
const getIndexedEvent = rawEvent => {
  let title = "Facebook Post without a message";
  let text = "";
  let link = rawEvent.permalink_url;
  let image_link = "";
  let media_link = "";
  switch (rawEvent.type) {
    case "status":
      if (rawEvent.place) {
        text = `<strong>${rawEvent.place["name"]}</strong>,
            ${rawEvent.place["street"] || ""},
            ${rawEvent.place["city"] || ""}`;
        if (rawEvent.message) {
          title = rawEvent.message;
        } else {
          title = `Checked In at ${rawEvent.place["name"]}`;
          text = title + ": " + text;
        }
      } else {
        if (rawEvent.message) {
          title = rawEvent.message.slice(0, 90);

          text = rawEvent.message;
        }
      }
      break;
    case "photo":
      description =
        rawEvent.message ||
        rawEvent.description ||
        rawEvent.name ||
        "Facebook Photo";
      title = description.slice(0, 90);
      text = description;
      if (rawEvent.picture) {
        text = `<img src="${rawEvent.picture}" /> ${text}`;
        image_link = rawEvent.full_picture;
      }
      break;
    case "link":
      description =
        rawEvent.message ||
        rawEvent.description ||
        rawEvent.caption ||
        rawEvent.name ||
        "Link You Shared";
      title = description.slice(0, 90);
      text = `<a href=${rawEvent.link} target="_blank">${
        rawEvent.name
      }</a>${description}`;

      if (rawEvent.picture) {
        text = `<img src="${rawEvent.picture}" /> ${text}`;
        image_link = rawEvent.full_picture;
      }
      break;
    case "video":
      description =
        rawEvent.message ||
        rawEvent.description ||
        rawEvent.name ||
        "Facebook Video";
      title = description.slice(0, 90);
      text = description;
      if (rawEvent.picture) {
        text = `<img src="${rawEvent.picture}" /> ${text}`;
        image_link = rawEvent.full_picture;
      }
      media_link = rawEvent.link;
      break;
    default:
    //
  }

  event = {
    title,
    text,
    link,
    image_link,
    media_link
  };
  return event;
};

module.exports = { getIndexedEvent };
