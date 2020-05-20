// Requiring path to so we can use relative routes to our HTML files
const router = require("express").Router();
const db = require("../models");


// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

/**
 * Home Page
 */
router.get("/", function(req, res) {
  res.render("index", { user: req.user });
});

/**
 * Home Page, again
 */
router.get("/home", function(req, res) {
  res.render("index", { user: req.user });
});

/**
 * Signup page
 */
router.get("/signup", function(req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("signup", { user: req.user });
  }
});

/**
 * Login page
 */
router.get("/login", function(req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { user: req.user });
  }
});

/**
 * Login page
 */
router.get("/animalSubmit", function(req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("animalSubmit", { user: req.user });
  }
});

/**
 * Forum Page -
 * Notice loading our posts, with that include!
 */
router.get("/forum", isAuthenticated, function(req, res) {
  db.Post.findAll({ raw: true, include: [db.User] }) // Joins User to Posts! And scrapes all the seqeulize stuff off
    .then(dbModel => {
      res.render("forum", { user: req.user, posts: dbModel });
    })
    .catch(err => res.status(422).json(err));
});
/**
 * All Animals
 */
router.get("/allAnimals", function(req, res) {
  db.Animal.findAll({ raw: true, include: [db.User] }).then(dbModel => {
    // console.log(dbModel);
    res.render("allAnimals", { user: req.user, animal: dbModel });
  });
});

/**
 * Submission page
 */
router.get("/submit", isAuthenticated, function(req, res) {
  if (req.user.isEmployee) {
    res.render("animalSubmit", { user: req.user });
  } else {
    res.redirect("/");
  }
});

/**
 * Cats
 */
router.get("/cats", function(req, res) {
  db.Animal.findAll({
    raw: true,
    where: {
      species: "cat"
    }
  }).then(dbModel => {
    console.log(dbModel);
    res.render("cats", { animal: dbModel });
  });
});

/**
 * Dogs
 */
router.get("/dogs", function(req, res) {
  db.Animal.findAll({
    raw: true,
    where: {
      species: "dog"
    }
  }).then(dbModel => {
    res.render("dogs", { animal: dbModel });
  });
});

/**
 * Misc
 */
router.get("/misc", function(req, res) {
  const { Op } = require("sequelize");
  db.Animal.findAll({
    raw: true,
    where: {
      species: { [Op.not]: ["cat", "dog"] }
    }
  }).then(dbModel => {
    res.render("misc", { animal: dbModel });
  });
});
/**
 * one animal page
 */
router.get("/allAnimals/:id", function(req, res) {
  db.Animal.findOne({
    where: { id: req.params.id }
  }).then(dbModel => {
    console.log(dbModel.dataValues);
    let date = dbModel.get("createdAt").toLocaleDateString("en-US");
    res.render("oneAnimalPage", { animal: dbModel.dataValues, date: date });
  });
});

/**
 * Generic Error Page
 */
router.get("*", function(req, res) {
  res.render("errors/404", { user: req.user });
});

module.exports = router;
