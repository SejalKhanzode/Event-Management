const express = require("express")
const router = express.Router()
const {createEvent, getAllEvents,getOrganizerEvent, deleteEvent } = require("../controllers/Event")
const { auth, isOrganizer } = require("../middleware/auth")

router.post("/addEvent",auth, isOrganizer, createEvent);
router.get("/getAllEvents", getAllEvents);
router.get("/getEvent",auth, isOrganizer, getOrganizerEvent)
router.delete("/deleteEvent", auth, isOrganizer, deleteEvent)

module.exports = router