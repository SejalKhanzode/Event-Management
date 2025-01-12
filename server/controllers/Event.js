const Event = require("../models/eventModel")
const Category = require("../models/categoryModel")
const User = require("../models/userModel")
// const { uploadImageToCloudinary } = require("../utils/imageUploader")

// const { convertSecondsToDuration } = require("../utils/secToDuration");


// Function to create a new event
exports.createEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    let {
      eventName,
      description,
      category,
      attendeCount
    } = req.body
    // Get thumbnail image from request files
    // const thumbnail = req.files.thumbnailImage

    // Check if any of the required fields are missing
    if (
      !eventName ||
      !description ||
      !category ||
      !attendeCount
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }

    const organizerDetails = await User.findById(userId, {
      accountType: "Organizer",
    })

    if (!organizerDetails) {
      return res.status(404).json({
        success: false,
        message: "Organizer Details Not Found",
      })
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
    // Upload the Thumbnail to Cloudinary
    // const thumbnailImage = await uploadImageToCloudinary(
    //   thumbnail,
    //   process.env.FOLDER_NAME
    // )
    // console.log(thumbnailImage)
    // Create a new Event with the given details
    const newEvent = await Event.create({
      eventName,
      description,
      organizer: organizerDetails._id,
      category: categoryDetails._id,
      attendeCount,
    //   thumbnail: thumbnailImage.secure_url,
    })

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: organizerDetails._id,
      },
      {
        $push: {
          events: newEvent._id,
        },
      },
      { new: true }
    )
    // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          events: newEvent._id,
        },
      },
      { new: true }
    )
    
    res.status(200).json({
      success: true,
      data: newEvent,
      message: "Event Created Successfully",
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    })
  }
}

// Get Event List
exports.getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find(
    {}
    )
      .populate("organizer")
      .exec()

    return res.status(200).json({
      success: true,
      data: allEvents,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Event Data`,
      error: error.message,
    })
  }
}

exports.getOrganizerEvent = async (req, res) => {
  try {
    const organizerId = req.user.id
    const organizerEvent = await Event.find({
      organizer: organizerId,
    }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      data: organizerEvent,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve organizers event",
      error: error.message,
    })
  }
}

// Delete the Event
exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.body

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    await Event.findByIdAndDelete(eventId)

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}