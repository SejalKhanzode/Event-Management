const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

//auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "");

    //if token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//isGuest
exports.isGuest = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Guest") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Guests only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User accountType cannot be verified, please try again",
    });
  }
};

//isOrganizer
exports.isOrganizer = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !=="Organizer") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Organizer",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};


// isAdmin
exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};