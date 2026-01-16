const mongoose = require('mongoose');

const classChangeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  originalDate: {
    type: Date,
    required: true
  },
  originalTime: {
    type: String,
    required: true
  },
  changeType: {
    type: String,
    enum: ['postponed', 'cancelled', 'rescheduled', 'extra'],
    required: true
  },
  newDate: {
    type: Date
  },
  newTime: {
    type: String
  },
  reason: {
    type: String,
    trim: true
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ClassChange', classChangeSchema);
