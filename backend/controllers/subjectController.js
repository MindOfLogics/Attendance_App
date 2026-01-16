const Subject = require('../models/Subject');
const Attendance = require('../models/Attendance');

// @desc    Get all subjects for user
// @route   GET /api/subjects
// @access  Private
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user._id, isActive: true });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new subject
// @route   POST /api/subjects
// @access  Private
const createSubject = async (req, res) => {
  try {
    const { name, code, teacher, color, credits } = req.body;

    const subject = await Subject.create({
      userId: req.user._id,
      name,
      code,
      teacher,
      color: color || '#4F46E5',
      credits: credits || 3
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Private
const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findOne({ _id: req.params.id, userId: req.user._id });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const { name, code, teacher, color, credits } = req.body;

    subject.name = name || subject.name;
    subject.code = code || subject.code;
    subject.teacher = teacher || subject.teacher;
    subject.color = color || subject.color;
    subject.credits = credits !== undefined ? credits : subject.credits;

    const updatedSubject = await subject.save();
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Private
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findOne({ _id: req.params.id, userId: req.user._id });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    subject.isActive = false;
    await subject.save();

    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get attendance calculations for subject
// @route   GET /api/subjects/:id/calculations
// @access  Private
const getAttendanceCalculations = async (req, res) => {
  try {
    const subject = await Subject.findOne({ _id: req.params.id, userId: req.user._id });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const targetPercentage = req.query.target || req.user.minAttendancePercentage || 75;
    const calculations = subject.calculateClassesNeeded(parseFloat(targetPercentage));

    res.json({
      subject: {
        name: subject.name,
        totalClasses: subject.totalClasses,
        attendedClasses: subject.attendedClasses,
        currentPercentage: subject.attendancePercentage
      },
      targetPercentage: parseFloat(targetPercentage),
      ...calculations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark attendance
// @route   POST /api/subjects/:id/attendance
// @access  Private
const markAttendance = async (req, res) => {
  try {
    const { status, date, periodNumber, notes } = req.body;
    const subject = await Subject.findOne({ _id: req.params.id, userId: req.user._id });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Create attendance record
    const attendance = await Attendance.create({
      userId: req.user._id,
      subjectId: subject._id,
      date: date || new Date(),
      status,
      periodNumber,
      notes
    });

    // Update subject statistics (only for present/absent, not for cancelled/postponed)
    if (status === 'present' || status === 'absent') {
      subject.totalClasses += 1;
      if (status === 'present') {
        subject.attendedClasses += 1;
      }
      await subject.save();
    }

    res.status(201).json({
      attendance,
      subject: {
        totalClasses: subject.totalClasses,
        attendedClasses: subject.attendedClasses,
        attendancePercentage: subject.attendancePercentage
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Attendance already marked for this class' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getAttendanceCalculations,
  markAttendance
};
