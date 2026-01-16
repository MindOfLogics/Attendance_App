const express = require('express');
const router = express.Router();
const {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getAttendanceCalculations,
  markAttendance
} = require('../controllers/subjectController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getSubjects)
  .post(createSubject);

router.route('/:id')
  .put(updateSubject)
  .delete(deleteSubject);

router.get('/:id/calculations', getAttendanceCalculations);
router.post('/:id/attendance', markAttendance);

module.exports = router;
