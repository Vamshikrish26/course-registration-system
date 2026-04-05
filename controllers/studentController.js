const studentModel = require("../models/studentModel");
const registrationModel = require("../models/registrationModel");

// ================= REGISTER =================
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existing = await studentModel.getStudentByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const id = await studentModel.createStudent(name, email, password);

    res.json({ message: "Registered successfully", id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const courses = await registrationModel.getStudentRegistrations(id);

    res.json(courses);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= ADMIN LOGIN =================
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 Hardcoded admin credentials
    const adminEmail = "testadmin@gmail.com";
    const adminPassword = "123123";

    if (email === adminEmail && password === adminPassword) {
      return res.json({ message: "Admin login successful" });
    }

    return res.status(401).json({ message: "Invalid admin credentials" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= LOGIN =================
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await studentModel.getStudentByEmail(email);

    if (!student || student.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      id: student.id,
      name: student.name,
      email: student.email
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};