const db = require("../../models");
const router = require("express").Router();

/**
 * User - All Animals
 */
router.get("/api/allAnimals", function(req, res) {
  db.Animal.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * User Read - One Animal
 */
router.get("/api/allAnimals/:id", function(req, res) {
  db.Animal.findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * User - Create an Animal
 */
router.post("/api/allAnimals", function(req, res) {
  db.Animal.create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * User - Update an Animal
 */
router.put("/api/allAnimals/:id", function(req, res) {
  db.Animal.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * User - Delete an Animal
 */
router.delete("/api/allAnimals/:id", function(req, res) {
  db.Animal.findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
