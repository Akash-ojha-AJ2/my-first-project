const Listing = require("./models/listing");
const Review = require("./models/review");
const {listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res , next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in create listing");
        return res.redirect("/login");
        }
        next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error" , "you are not owner of this listing");
    return  res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next) =>{
    let{error} = listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",")
    throw new ExpressError(404 , errMsg);
   } else{
    next();
   }
  };

module.exports.validatereview = (req,res,next) =>{
    let{error} = reviewSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",")
    throw new ExpressError(404 , errMsg);
   } else{
    next();
   }
  };

  module.exports.reviewOwner = async(req,res,next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.user.equals(res.locals.currUser._id)) {
    req.flash("error" , "you are not user of this review");
    return  res.redirect(`/listings/${id}`);
    }
    next();
};