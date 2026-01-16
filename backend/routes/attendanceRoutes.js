const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Subject = require('../models/Subject');
const { protect } = require('../middleware/auth');

router.use(protect);

// @desc    Delete attendance record
// @route   DELETE /api/attendance/:id
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    // Update subject statistics
    if (attendance.status === 'present' || attendance.status === 'absent') {
      const subject = await Subject.findById(attendance.subjectId);
      
      if (subject) {
        subject.totalClasses = Math.max(0, subject.totalClasses - 1);
        if (attendance.status === 'present') {
          subject.attendedClasses = Math.max(0, subject.attendedClasses - 1);
        }
        await subject.save();
      }
    }

    await Attendance.deleteOne({ _id: req.params.id });

    res.json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
