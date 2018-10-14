const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByName: function (req, res) {
    console.log(req.params.username)
    db.Book
      .findOne({ "username": req.params.username })
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  addVideo: function (req, res) {
    console.log(req)
    db.Book
      .findOneAndUpdate({ _id: req.params.userID },
        { $push: { posts: req.params.videoID } })
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  removeVideo: function (req, res) {
    console.log(req)
    db.Book
      .findOneAndUpdate({ _id: req.params.userID },
        { $pull: { posts: req.params.videoID } })
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },


  addFriend: function (req, res) {
    console.log(req)
    db.Book
      .findOneAndUpdate({ _id: req.params.userID },
        { $push: { friends: req.params.friendID } })
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  removeFriend: function (req, res) {
    console.log(req)
    db.Book
      .findOneAndUpdate({ _id: req.params.userID },
        { $pull: { friends: req.params.friendID } })
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  update: function (req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
