const Guest = require('../models/Guest');

exports.getGuests = async (req, res) => {
    try {
        const guests = await Guest.find({ userId: req.user.id });
        res.json(guests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addGuest = async (req, res) => {
    const { guestName, email, phone } = req.body;
    try {
        const newGuest = new Guest({
            userId: req.user.id,
            guestName,
            email,
            phone,
            status: 'Invited'
        });
        const guest = await newGuest.save();
        res.json(guest);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateGuest = async (req, res) => {
    const { guestName, email, phone, status } = req.body;
    try {
        let guest = await Guest.findById(req.params.id);
        if (!guest) return res.status(404).json({ msg: 'Guest not found' });

        if (guest.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        guest.guestName = guestName || guest.guestName;
        guest.email = email || guest.email;
        guest.phone = phone || guest.phone;
        guest.status = status || guest.status; // Invited / Confirmed

        await guest.save();
        res.json(guest);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteGuest = async (req, res) => {
    try {
        const guest = await Guest.findById(req.params.id);
        if (!guest) return res.status(404).json({ msg: 'Guest not found' });

        if (guest.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Guest.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Guest removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
