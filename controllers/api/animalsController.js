const db = require("../../models");
const router = require("express").Router();
const { Op } = require("sequelize");
/**
 * User - All Animals
 */
router.get("/", function(req, res) {
  db.Animal.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * User Read - One Animal
 */
router.get("/:id", function(req, res) {
  db.Animal.findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * User - Create an Animal
 */
router.post("/", function(req, res) {
  db.Animal.create(req.body)
    .then(dbModel => {
      res.json(dbModel);
    })
    .catch(err => res.status(422).json(err));
});

/**
 * User - Update an Animal
 */
router.put("/:id", function(req, res) {
  db.Animal.update(req.body, { where: { id: req.params.id }})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * User - Delete
 */
router.delete("/:id", function(req, res) {
  db.Animal.destroy({ where: { id: req.params.id } })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
