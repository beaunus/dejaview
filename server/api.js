const router = require("express").Router();
// const redisClient = require("./redis");
// const shortid = require("shortid");
// const { kafkaProducer } = require("./kafka");

router.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

// function isAuthenticated(req, res, next) {
//   if (req.user) return next();
//   res.sendStatus(401);
// }

// router.get("/trucks", isAuthenticated, (req, res) => {
//   redisClient.keys("truck:*", (err, replies) => {
//     redisClient.mget(replies, (err, trucks) => {
//       if (trucks) {
//         res.send(
//           trucks.reduce(function(result, truckString) {
//             const truck = JSON.parse(truckString);
//             result[truck.id] = truck;
//             return result;
//           }, {})
//         );
//       } else {
//         res.status(200).send([]);
//       }
//     });
//   });
// });

// router.get("/trucks/:id", isAuthenticated, (req, res) => {
//   const truckId = req.params.id;
//   const key = "truck:" + truckId;
//   redisClient.get(key, (err, reply) => {
//     res.send(JSON.parse(reply));
//   });
// });

// router.get("/trips", isAuthenticated, (req, res) => {
//   redisClient.keys("trip:*", (err, replies) => {
//     redisClient.mget(replies, (err, trips) => {
//       if (trips) {
//         res.send(
//           trips.reduce(function(result, tripString) {
//             const trip = JSON.parse(tripString);
//             result[trip.id] = trip;
//             return result;
//           }, {})
//         );
//       } else {
//         res.status(200).send([]);
//       }
//     });
//   });
// });

// router.get("/trips/:id", isAuthenticated, (req, res) => {
//   const tripId = req.params.id;
//   const key = "trip:" + tripId;
//   redisClient.get(key, (err, reply) => {
//     res.send(JSON.parse(reply));
//   });
// });

// router.post("/trips", isAuthenticated, async (req, res) => {
//   const tripId = shortid.generate();
//   const tripBody = JSON.stringify({
//     id: tripId,
//     completed: false,
//     inProgress: false,
//     deleted: false,
//     origin: req.body.origin,
//     destination: req.body.destination,
//     truckId: null,
//   });
//   redisClient.set(`trip:${tripId}`, tripBody);
//   res.status(200).send(tripBody);
// });

// router.delete("/trips/:id", isAuthenticated, async (req, res) => {
//   const tripId = req.params.id;
//   const key = "trip:" + tripId;
//   redisClient.get(key, (err, reply) => {
//     trip = JSON.parse(reply);
//     trip.deleted = true;
//     const tripBody = JSON.stringify(trip);
//     redisClient.set(`trip:${trip.id}`, tripBody);
//     res.status(200).send(tripBody);
//   });
// });

// router.post("/position", async (req, res) => {
//   const payload = [
//     {
//       topic: "trucks",
//       messages: JSON.stringify(req.body),
//     },
//   ];
//   kafkaProducer.send(payload, (err, data) => {
//     res.json(data);
//   });
// });

module.exports = router;
