const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send({
    "20180604": [
      {
        title: "The Headline",
        text: "So and so did an interesting thing...",
        link: "https://www.thing.com",
        label: "New York Times"
      }
    ]
  });
});

module.exports = router;
