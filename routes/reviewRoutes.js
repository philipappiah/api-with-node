const express = require("express");

const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

//Implementing nested routes
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route("/").get(reviewController.getAllReviews);
router
  .route("/")
  .post(
    authController.restrictTo("user"),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route("/:id")
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  );
router
  .route("/:id")
  .patch(
    authController.restrictTo("user", "admin"),
    reviewController.updateReview
  );
router.route("/:id").get(reviewController.getReview);
module.exports = router;
