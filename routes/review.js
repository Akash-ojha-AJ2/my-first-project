const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewOwner,validatereview, isLoggedIn } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
  
// create review 
router.post("/",isLoggedIn,validatereview,wrapAsync(reviewController.createReview));
  
  // Delete review
  router.delete("/:reviewId", isLoggedIn , reviewOwner, wrapAsync(reviewController.deleteReview));

  module.exports = router;
  