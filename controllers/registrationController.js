const registrationModel = require("../models/registrationModel");
const courseModel = require("../models/courseModel");

// POST /registrations
exports.registerCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({ message: "studentId and courseId required" });
    }

    // 1️⃣ Duplicate Registration
    const duplicate = await registrationModel.checkDuplicate(studentId, courseId);
    if (duplicate.length > 0) {
      return res.status(400).json({ message: "Already registered for this course" });
    }

    // 2️⃣ Get Course Details
    const course = await courseModel.getCourseById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 3️⃣ Seat Capacity Check
    const total = await registrationModel.countRegistrations(courseId);
    if (total >= course.capacity) {
      return res.status(400).json({ message: "Course Full" });
    }

    // 4️⃣ Schedule Conflict Check
    const studentCourses = await registrationModel.getStudentRegistrations(studentId);

    for (let c of studentCourses) {
      const sameDay = c.days === course.days;

      const overlap = !(
        course.endTime <= c.startTime || 
        course.startTime >= c.endTime
      );

      if (sameDay && overlap) {
        return res.status(400).json({ message: "Schedule Conflict" });
      }
    }

    // 5️⃣ Register
    await registrationModel.createRegistration(studentId, courseId);

    res.status(201).json({ message: "Course registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /registrations/:id
exports.dropCourse = async (req, res) => {
  try {
    const { id } = req.params;

    await registrationModel.deleteRegistration(id);

    // Seat automatically frees (no extra logic needed)
    res.json({ message: "Course dropped successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /registrations/student/:id
exports.getStudentCourses = async (req, res) => {
  try {
    const { id } = req.params;

    const courses = await registrationModel.getStudentRegistrations(id);

    res.json(courses);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};