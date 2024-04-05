const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


//@desc POST /user/sign-up



function signup(req, res) {


  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email Already Exist!",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          //salt: it adds the randon string end of the password

          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            };

            models.User.create(user)

              .then((result) => {
                res.status(201).json({
                  message: "User Created Successfully",
                  post: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Something Went Wrong",
                  error: error,
                });
              });
          });
        });
      }
    })

    .catch((error) => {
      res.status(500).json({
        message: "Something Went Wrong",
        error: error,
      });
    });
}
















//@desc POST '/login'

function login(req, res) {

models.User.findOne({ where: { email: req.body.email } })
  
      .then((user) => {
        if (user === null) {
          res.status(401).json({
            message: "Invalid Credentials",
          });
        } else {
          bcryptjs.compare(
            req.body.password,
            user.password,
            function (err, result) {
              if (result) {
                const token = jwt.sign(
                  {
                    email: user.email,
                    userId: user.id,
                  },
                  process.env.JWT_KEY,
                  function (err, token) {
                    res.status(200).json({
                      message: "Authentication Successful",
                      token: token,
                    });
                  }
                );
              } else {
                res.status(401).json({
                  message: "Invalid Credentails",
                });
              }
            }
          );
        }
      })
      .catch((err) => {
        res.json(500).json({
          message: "Somethind Went Wrong",
        });
      });
  }  


  

module.exports = {
  signup: signup,
  login: login
};
