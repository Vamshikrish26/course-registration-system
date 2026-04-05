const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

// ================= AUTH =================

// 🔥 Register student
router.post("/register", studentController.registerStudent);

// 🔥 Login student
router.post("/login", studentController.loginStudent);


// ================= STUDENT FEATURES =================

// 📌 Get student schedule (My Schedule page)
router.get("/:id/courses", studentController.getSchedule);
router.post("/admin/login", studentController.loginAdmin);


module.exports = router;