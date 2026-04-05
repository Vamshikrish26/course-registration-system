const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");

// 📌 GET all courses (Student + Admin)
router.get("/", courseController.getCourses);

router.get("/:id/students", courseController.getCourseStudents);

// 📌 CREATE course (Admin)
router.post("/", courseController.createCourse);

// 📌 UPDATE course (Admin)
router.put("/:id", courseController.updateCourse);

// 📌 DELETE course (Admin)
router.delete("/:id", courseController.deleteCourse);

module.exports = router;