const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/registrationController");

// 📌 REGISTER course
router.post("/", registrationController.registerCourse);

// 📌 DROP course
router.delete("/:id", registrationController.dropCourse);

// 📌 GET student registered courses (schedule)
router.get("/student/:id", registrationController.getStudentCourses);

module.exports = router;