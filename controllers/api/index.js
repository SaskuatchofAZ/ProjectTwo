const router = require("express").Router();
// Import our controllers
const postRoutes = require("./postsController");
const userRoutes = require("./usersController");
const animalsRoutes = require("./animalsController");
const catRoutes = require("./catController");

// Hook up to the router
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/allAnimals", animalsRoutes);
router.use("/cats", catRoutes);

// Export the router
module.exports = router;
