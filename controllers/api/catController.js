const db = require("../../models");
const router = require("express").Router();

/**
 * User - All Animals
 */
router.get("/api/cats", function (req, res) {
    db.Animal.findAll({
        where: {
            species: "cat"
        }
    })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User Read - One Animal
 */
router.get("/api/cats/:id", function (req, res) {
    db.Animal.findById({
        where: {
            id: req.params.id,
            species: "cat"
        }
    }).then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User - Create an Animal
 */
router.post("/api/cats", function (req, res) {
    const newCat = req.body;

    db.Animal.create({
        breed: newCat.breed,
        age: newCat.age,
        weight: newCat.weight
        // Other stuff
    }).then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User - Update an Animal
 */
router.put("/api/cats/:id", function (req, res) {
    db.Animal.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User - Delete an Animal
 */
router.delete("/api/cats/:id", function (req, res) {
    db.Animal.findById({
        where: {
            id: req.params.id
        }

    }).then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
});

module.exports = router;
