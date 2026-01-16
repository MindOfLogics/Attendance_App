const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    trim: true
  },
  teacher: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    default: '#4F46E5'
  },
  totalClasses: {
    type: Number,
    default: 0
  },
  attendedClasses: {
    type: Number,
    default: 0
  },
  credits: {
    type: Number,
    default: 3
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual for attendance percentage
subjectSchema.virtual('attendancePercentage').get(function() {
  if (this.totalClasses === 0) return 0;
  return ((this.attendedClasses / this.totalClasses) * 100).toFixed(2);
});

// Method to calculate classes needed to reach target percentage
subjectSchema.methods.calculateClassesNeeded = function(targetPercentage) {
  const currentAttended = this.attendedClasses;
  const currentTotal = this.totalClasses;
  
  // Calculate classes needed to attend
  const classesToAttend = Math.ceil(
    (targetPercentage * currentTotal - 100 * currentAttended) / (100 - targetPercentage)
  );
  
  // Calculate classes can miss
  const classesCanMiss = Math.floor(
    (100 * currentAttended - targetPercentage * currentTotal) / targetPercentage
  );
  
  return {
    classesToAttend: classesToAttend > 0 ? classesToAttend : 0,
    classesCanMiss: classesCanMiss > 0 ? classesCanMiss : 0,
    currentPercentage: this.attendancePercentage
  };
};

subjectSchema.set('toJSON', { virtuals: true });
subjectSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Subject', subjectSchema);
