const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getGuests, addGuest, updateGuest, deleteGuest } = require('../controllers/guestController');

router.use(auth);

router.get('/', getGuests);
router.post('/', addGuest);
router.put('/:id', updateGuest);
router.delete('/:id', deleteGuest);

module.exports = router;
