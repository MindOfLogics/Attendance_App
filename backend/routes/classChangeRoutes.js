const express = require('express');
const router = express.Router();
const {
  getClassChanges,
  getUpcomingClassChanges,
  createClassChange,
  updateClassChange,
  deleteClassChange
} = require('../controllers/classChangeController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getClassChanges)
  .post(createClassChange);

router.get('/upcoming', getUpcomingClassChanges);

router.route('/:id')
  .put(updateClassChange)
  .delete(deleteClassChange);

module.exports = router;
