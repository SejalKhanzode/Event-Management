const express = require("express")
const router = express.Router()

const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
  } = require("../controllers/Category")

  const {auth, isAdmin} = require("../middleware/auth")

router.post("/addCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

module.exports = router