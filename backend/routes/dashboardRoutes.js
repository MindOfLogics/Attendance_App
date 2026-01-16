const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAttendanceHistory
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/history', getAttendanceHistory);

module.exports = router;
