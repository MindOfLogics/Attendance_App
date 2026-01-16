const ClassChange = require('../models/ClassChange');
const Subject = require('../models/Subject');

// @desc    Get all class changes
// @route   GET /api/class-changes
// @access  Private
const getClassChanges = async (req, res) => {
  try {
    const classChanges = await ClassChange.find({ 
      userId: req.user._id,
      isActive: true 
    })
    .populate('subjectId', 'name code color')
    .sort('-originalDate');

    res.json(classChanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get upcoming class changes
// @route   GET /api/class-changes/upcoming
// @access  Private
const getUpcomingClassChanges = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const classChanges = await ClassChange.find({ 
      userId: req.user._id,
      isActive: true,
      originalDate: { $gte: today }
    })
    .populate('subjectId', 'name code color')
    .sort('originalDate')
    .limit(10);

    res.json(classChanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create class change
// @route   POST /api/class-changes
// @access  Private
const createClassChange = async (req, res) => {
  try {
    const { 
      subjectId, 
      originalDate, 
      originalTime, 
      changeType, 
      newDate, 
      newTime, 
      reason 
    } = req.body;

    // Verify subject belongs to user
    const subject = await Subject.findOne({ 
      _id: subjectId, 
      userId: req.user._id 
    });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const classChange = await ClassChange.create({
      userId: req.user._id,
      subjectId,
      originalDate,
      originalTime,
      changeType,
      newDate,
      newTime,
      reason
    });

    const populatedChange = await ClassChange.findById(classChange._id)
      .populate('subjectId', 'name code color');

    res.status(201).json(populatedChange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update class change
// @route   PUT /api/class-changes/:id
// @access  Private
const updateClassChange = async (req, res) => {
  try {
    const classChange = await ClassChange.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!classChange) {
      return res.status(404).json({ message: 'Class change not found' });
    }

    const { changeType, newDate, newTime, reason, isActive } = req.body;

    classChange.changeType = changeType || classChange.changeType;
    classChange.newDate = newDate || classChange.newDate;
    classChange.newTime = newTime || classChange.newTime;
    classChange.reason = reason || classChange.reason;
    classChange.isActive = isActive !== undefined ? isActive : classChange.isActive;

    const updatedChange = await classChange.save();
    
    const populatedChange = await ClassChange.findById(updatedChange._id)
      .populate('subjectId', 'name code color');

    res.json(populatedChange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete class change
// @route   DELETE /api/class-changes/:id
// @access  Private
const deleteClassChange = async (req, res) => {
  try {
    const classChange = await ClassChange.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!classChange) {
      return res.status(404).json({ message: 'Class change not found' });
    }

    classChange.isActive = false;
    await classChange.save();

    res.json({ message: 'Class change deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClassChanges,
  getUpcomingClassChanges,
  createClassChange,
  updateClassChange,
  deleteClassChange
};
