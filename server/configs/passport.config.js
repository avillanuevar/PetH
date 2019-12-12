const User = require("../models/User.model");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");

passport.serializeUser((loggedInUser, cb) => cb(null, loggedInUser._id));

passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, userDocument);
    });
//   User.findById(userIdFromSession)
//     .populate("pets")
//     .then(userDocument => cb(null, userDocument))
//     .catch(err => {
//       cb(err);
//       return;
//     });
});

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: "Usuario no registrado." });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: "Contraseña incorrecta." });
        return;
      }

      next(null, foundUser);
    });

    // User.findOne({ username })
    //   .populate("pets")
    //   .then(foundUser => {
    //     if (!bcrypt.compareSync(password, foundUser.password)) {
    //       next(null, false, { message: "Contraseña incorrecta." });
    //       return;
    //     }
    //     next(null, foundUser);
    //   })
    //   .catch(err => {
    //     next(err);
    //     return;
    //   });
  })
);
