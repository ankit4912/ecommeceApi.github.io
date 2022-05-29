import { hash } from "bcrypt";
import user from "../models/user.model";
import mongoose from "mongoose";
const bcrypt = require("bcrypt");

//** Create User */

export const newUser = (req, res) => {
  var userName = req.body.userName,
    email = req.body.email,
    contact = req.body.contact,
    password = req.body.password,
    confirmPassword = req.body.confirmPassword;
  if (password !== confirmPassword) {
    res.json({
      message: "❌Password Not Match❌",
      status: false,
    });
  } else {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return res.json({
          message: "❌Something Went Wrong,Try Later❌",
          status: false,
        });
      } else {
        console.log(hash);
        var userData = new user({
          userName: userName,
          email: email,
          contact: contact,
          password: hash,
          confirmPassword: hash,
        });

        userData
          .save()
          .then((doc) => {
            return res.status(200).json({
              message: "🎉User Sign Up Successfully🎉",
              data: userData,
              status: true,
            });
          })
          .catch((err) => {
            res.json(err);
          });
      }
    });
  }
};

//** Read User */

export const loginUser = (req, res) => {
  var userName = req.body.userName;
  user
    .find({ userName: userName })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(404).json({
          message: "❌authentication failed❌",
          status: false,
        });
      } else {
        bcrypt.compare(
          req.body.password,
          user[0].password,
          function (err, result) {
            if (err) {
              res.status(404).json({
                message: "❌authentication failed❌",
                status: false,
              });
            }
            if (result) {
              result == true;
              res.status(200).json({
                message: "🎉User Login Successfully🎉",
                user: user,
                status: true,
              });
            } else {
              res.status(404).json({
                message: "❌authentication failed❌",
                status: false,
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.json({
        message: "❌Something Went Wrong,Try Later❌",
        error: err,
        status: false,
      });
    });
};

export const usersAll = async (req, res) => {
  const usersFind = await user.find();

  if (!usersFind) {
    res.status(500).json({
      Error: err,
      status: false,
    });
  }
  res.send(usersFind);
};

export const findUser = async (req, res) => {
  const userFind = await user.findById(req.params.id);

  if (!userFind) {
    res.status(500).json({
      Error: err,
      status: false,
    });
  }
  res.send(userFind);
};

//** Update User */

export const editUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid user Id");
  }

  const userEdit = await user.findByIdAndUpdate(
    req.params.id,
    {
      userName: req.body.userName,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.hash,
      confirmPassword: req.body.hash,
    },
    {
      new: true,
    }
  );
  if (!userEdit) return res.status(500).send("the user cannot be updated!");
  res.send(userEdit);
};

//** Delete User */

export const deleteUser = async (req, res) => {
  var userName = req.body.userName;
  let deleteProfile = await user.findOneAndRemove({ userName: userName });
  if (deleteProfile) {
    res.send(deleteProfile);
  } else {
    res.send("No Found Data");
  }
};
