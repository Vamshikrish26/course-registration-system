const db = require("../config/db");

// ================= GET STUDENT BY ID =================
exports.getStudentById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, name, email FROM students WHERE id = ?",
    [id]
  );
  return rows[0];
};

// ================= GET STUDENT BY EMAIL =================
exports.getStudentByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM students WHERE email = ?",
    [email]
  );
  return rows[0];
};

// ================= CREATE STUDENT (REGISTER) =================
exports.createStudent = async (name, email, password) => {
  const [result] = await db.query(
    "INSERT INTO students (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );

  return result.insertId;
};