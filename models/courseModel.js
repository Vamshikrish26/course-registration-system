const db = require("../config/db");

// Get all courses
exports.getAllCourses = async () => {
  const [rows] = await db.query("SELECT * FROM courses");
  return rows;
};

// Get course by ID
exports.getCourseById = async (id) => {
  const [rows] = await db.query("SELECT * FROM courses WHERE id = ?", [id]);
  return rows[0];
};

// Create course
exports.createCourse = async (course) => {
  const [result] = await db.query(
    `INSERT INTO courses 
    (courseName, courseCode, instructor, description, startTime, endTime, days, capacity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      course.courseName,
      course.courseCode,
      course.instructor,
      course.description,
      course.startTime,
      course.endTime,
      course.days,
      course.capacity
    ]
  );
  return result;
};

// Update course
exports.updateCourse = async (id, course) => {
  const [result] = await db.query(
    `UPDATE courses SET 
      courseName=?, courseCode=?, instructor=?, description=?, 
      startTime=?, endTime=?, days=?, capacity=?
     WHERE id=?`,
    [
      course.courseName,
      course.courseCode,
      course.instructor,
      course.description,
      course.startTime,
      course.endTime,
      course.days,
      course.capacity,
      id
    ]
  );
  return result;
};

// Delete course
exports.deleteCourse = async (id) => {
  const [result] = await db.query(
    "DELETE FROM courses WHERE id = ?",
    [id]
  );
  return result;
};