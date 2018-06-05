const express = require("express");
const path = require("path");
const app = express();
// const passport = require("passport");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

const morgan = require("morgan");
const bodyParser = require("body-parser");

const api = require("./api");
const PORT = process.env.PORT || 3001;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3001/auth/google/return",
//     },
//     function(accessToken, refreshToken, profile, done) {
//       const payload = [
//         {
//           topic: "users",
//           messages: JSON.stringify(profile),
//         },
//       ];
//       kafkaProducer.send(payload, (err, data) => {
//         console.log("User profile send to kafka");
//       });
//       done(null, profile);
//     }
//   )
// );

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(userId, done) {
//   done(null, userId);
// });

app.use(morgan("dev"));

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: "code chrysalis banzai!",
//     resave: false,
//     saveUninitialized: false
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// app.get(
//   "/auth/google/return",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function(req, res) {
//     res.redirect("/");
//   }
// );
app.use("/api/v1", api);
app.use(express.static(path.join(__dirname, "../build")));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
