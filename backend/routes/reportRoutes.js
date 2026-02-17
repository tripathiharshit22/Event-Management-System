const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getReports } = require('../controllers/reportController');


router.get('/', auth, getReports);

module.exports = router;
