const db = require("../config/db");
const courseModel = require("../models/courseModel");

const registrationModel = require("../models/registrationModel");

// GET /courses/:id/students
exports.getCourseStudents = async (req, res) => {
  try {
    const { id } = req.params;

    const students = await registrationModel.getStudentsByCourse(id);

    res.json(students);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /courses
exports.getCourses = async (req, res) => {
  try {
    const [courses] = await db.query(`
      SELECT 
        c.*,
        (c.capacity - COUNT(r.id)) AS availableSeats
      FROM courses c
      LEFT JOIN registrations r ON c.id = r.courseId
      GROUP BY c.id
    `);

    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /courses
exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseCode,
      instructor,
      description,
      startTime,
      endTime,
      days,
      capacity
    } = req.body;

    if (!courseName || !courseCode || !startTime || !endTime || !capacity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await courseModel.createCourse(req.body);
    res.status(201).json({ message: "Course created successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /courses/:id
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await courseModel.getCourseById(id);
    if (!existing) {
      return res.status(404).json({ message: "Course not found" });
    }

    await courseModel.updateCourse(id, req.body);
    res.json({ message: "Course updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await courseModel.getCourseById(id);
    if (!existing) {
      return res.status(404).json({ message: "Course not found" });
    }

    await courseModel.deleteCourse(id);
    res.json({ message: "Course deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};