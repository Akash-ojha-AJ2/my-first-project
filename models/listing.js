const { ref, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./review.js");


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
   url: String,
   filename: String
  },
  price: Number,
  location: String,
  country: String,
  review : [
    {
      type : Schema.Types.ObjectId,
      ref : "Review"
    }
  ],
  owner: {
    type : Schema.Types.ObjectId,
    ref: "user",
  },
  geometry : {
    type : {
      type : String,
      enum : ['Point'],
      required : true,
    },
  coordinates : {
    type : [Number],
    require : true,
  },
},
});

listingSchema.post   ("findOneAndDelete" , async (listing) => {
  if(listing){
    await review.deleteMany({_id : {$in: listing.review}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;