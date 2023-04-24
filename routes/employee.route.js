const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Employee model
let Employee = require("../models/Employee");

// regsiter/login Employee
router.post("/create", (req, res) => {
  Employee.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      const newUser = new Employee({
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) =>
              jwt.sign(
                { id: user.id, email: user.email },
                "secret",
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              )
            )
            .catch((err) => console.log(err));
        });
      });
    } else {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          const payLoad = { id: user.id, email: user.email };

          jwt.sign(payLoad, "secret", { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          });
        } else {
          return res.json("password is wrong");
        }
      });
    }
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
    });
  }
);

module.exports = router;
