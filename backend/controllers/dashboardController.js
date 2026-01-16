const Subject = require('../models/Subject');
const Attendance = require('../models/Attendance');
const ClassChange = require('../models/ClassChange');
const moment = require('moment');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const targetPercentage = req.user.minAttendancePercentage || 75;

    // Get all subjects
    const subjects = await Subject.find({ userId, isActive: true });

    // Calculate overall statistics
    let totalClasses = 0;
    let totalAttended = 0;
    let subjectsAtRisk = 0;
    let subjectsSafe = 0;

    const subjectDetails = subjects.map(subject => {
      totalClasses += subject.totalClasses;
      totalAttended += subject.attendedClasses;

      const percentage = parseFloat(subject.attendancePercentage);
      const calculations = subject.calculateClassesNeeded(targetPercentage);

      if (percentage < targetPercentage) {
        subjectsAtRisk++;
      } else {
        subjectsSafe++;
      }

      return {
        id: subject._id,
        name: subject.name,
        code: subject.code,
        color: subject.color,
        totalClasses: subject.totalClasses,
        attendedClasses: subject.attendedClasses,
        percentage: percentage,
        status: percentage >= targetPercentage ? 'safe' : 'risk',
        ...calculations
      };
    });

    // Calculate overall percentage
    const overallPercentage = totalClasses > 0 
      ? ((totalAttended / totalClasses) * 100).toFixed(2) 
      : 0;

    // Get recent attendance
    const recentAttendance = await Attendance.find({ userId })
      .populate('subjectId', 'name code color')
      .sort('-date')
      .limit(10);

    // Get upcoming class changes
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingChanges = await ClassChange.find({
      userId,
      isActive: true,
      originalDate: { $gte: today }
    })
    .populate('subjectId', 'name code color')
    .sort('originalDate')
    .limit(5);

    // Calculate weekly attendance trend
    const weekAgo = moment().subtract(7, 'days').toDate();
    const weeklyAttendance = await Attendance.find({
      userId,
      date: { $gte: weekAgo },
      status: { $in: ['present', 'absent'] }
    });

    const weeklyPresent = weeklyAttendance.filter(a => a.status === 'present').length;
    const weeklyTotal = weeklyAttendance.length;
    const weeklyPercentage = weeklyTotal > 0 
      ? ((weeklyPresent / weeklyTotal) * 100).toFixed(2) 
      : 0;

    res.json({
      overall: {
        totalClasses,
        totalAttended,
        percentage: parseFloat(overallPercentage),
        targetPercentage,
        subjectsAtRisk,
        subjectsSafe
      },
      subjects: subjectDetails,
      recentAttendance,
      upcomingChanges,
      weeklyStats: {
        percentage: parseFloat(weeklyPercentage),
        present: weeklyPresent,
        total: weeklyTotal
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get attendance history
// @route   GET /api/dashboard/history
// @access  Private
const getAttendanceHistory = async (req, res) => {
  try {
    const { startDate, endDate, subjectId } = req.query;

    const query = { userId: req.user._id };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (subjectId) {
      query.subjectId = subjectId;
    }

    const attendance = await Attendance.find(query)
      .populate('subjectId', 'name code color')
      .sort('-date');

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAttendanceHistory
};
