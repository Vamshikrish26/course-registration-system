const db = require("../config/db");

// Register student to course
exports.createRegistration = async (studentId, courseId) => {
  const [result] = await db.query(
    "INSERT INTO registrations (studentId, courseId) VALUES (?, ?)",
    [studentId, courseId]
  );
  return result;
};

// Delete registration (drop course)
exports.deleteRegistration = async (id) => {
  const [result] = await db.query(
    "DELETE FROM registrations WHERE id = ?",
    [id]
  );
  return result;
};

// Get student registrations
exports.getStudentRegistrations = async (studentId) => {
  const [rows] = await db.query(
    `SELECT r.id AS regId, c.*
     FROM registrations r
     JOIN courses c ON r.courseId = c.id
     WHERE r.studentId = ?`,
    [studentId]
  );

  return rows;
};

// Check duplicate registration
exports.checkDuplicate = async (studentId, courseId) => {
  const [rows] = await db.query(
    "SELECT * FROM registrations WHERE studentId=? AND courseId=?",
    [studentId, courseId]
  );
  return rows;
};

// Count enrolled students (for capacity check)
exports.countRegistrations = async (courseId) => {
  const [[row]] = await db.query(
    "SELECT COUNT(*) as total FROM registrations WHERE courseId=?",
    [courseId]
  );
  return row.total;
};

// Get students by course
exports.getStudentsByCourse = async (courseId) => {
  const [rows] = await db.query(
    `SELECT s.id, s.name, s.email
     FROM registrations r
     JOIN students s ON r.studentId = s.id
     WHERE r.courseId = ?`,
    [courseId]
  );

  return rows;
};