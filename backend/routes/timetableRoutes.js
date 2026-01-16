const express = require('express');
const router = express.Router();
const {
  getTimetable,
  createOrUpdateTimetable,
  deleteTimetable,
  getTodayTimetable
} = require('../controllers/timetableController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getTimetable)
  .post(createOrUpdateTimetable);

router.get('/today', getTodayTimetable);
router.delete('/:day', deleteTimetable);

module.exports = router;
