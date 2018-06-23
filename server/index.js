const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const api = require("./api");
const PORT = process.env.PORT || 3001;

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const preventCache = (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.
  next();
};

app.use(preventCache);

//TODO: remove secret
app.use(
  session({
    secret: "code chrysalis banzai!",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  done(null, userId);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      const info = {
        profile,
        accessToken,
        refreshToken
      };
      done(null, info);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "user_posts" })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

app.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/privacy.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/about.html"));
});

app.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/data.html"));
});

app.use("/api/v1", api);

app.use(express.static(path.join(__dirname, "../build")));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
