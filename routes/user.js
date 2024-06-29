const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const {saveRedirectUrl}  = require("../middleware.js");
const userController = require("../controllers/users.js");


router.route("/signup")
//signup page
.get( userController.signupPage)
//signup information to database
.post(wrapAsync(userController.signup)
);



router.route("/login")
//login page
.get( userController.loginPage)
//login information
.post(saveRedirectUrl,
    passport.authenticate("local" , {
        failureRedirect : "/login" , 
        failureFlash: true,
    }), 
    userController.login
);

//logout
router.get("/logout" , userController.logout);


module.exports = router; 
       