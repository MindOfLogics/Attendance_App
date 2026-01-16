const Timetable = require('../models/Timetable');
const Subject = require('../models/Subject');

// @desc    Get timetable for user
// @route   GET /api/timetable
// @access  Private
const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find({ 
      userId: req.user._id, 
      isActive: true 
    }).populate('periods.subjectId', 'name code color');

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update timetable for a day
// @route   POST /api/timetable
// @access  Private
const createOrUpdateTimetable = async (req, res) => {
  try {
    const { day, periods } = req.body;

    // Check if timetable exists for this day
    let timetable = await Timetable.findOne({ 
      userId: req.user._id, 
      day,
      isActive: true 
    });

    if (timetable) {
      // Update existing timetable
      timetable.periods = periods;
      await timetable.save();
    } else {
      // Create new timetable
      timetable = await Timetable.create({
        userId: req.user._id,
        day,
        periods
      });
    }

    const populatedTimetable = await Timetable.findById(timetable._id)
      .populate('periods.subjectId', 'name code color');

    res.status(201).json(populatedTimetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete timetable for a day
// @route   DELETE /api/timetable/:day
// @access  Private
const deleteTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ 
      userId: req.user._id, 
      day: req.params.day,
      isActive: true 
    });

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    timetable.isActive = false;
    await timetable.save();

    res.json({ message: 'Timetable deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get today's timetable
// @route   GET /api/timetable/today
// @access  Private
const getTodayTimetable = async (req, res) => {
  try {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];

    const timetable = await Timetable.findOne({ 
      userId: req.user._id, 
      day: today,
      isActive: true 
    }).populate('periods.subjectId', 'name code color teacher');

    res.json(timetable || { day: today, periods: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTimetable,
  createOrUpdateTimetable,
  deleteTimetable,
  getTodayTimetable
};
