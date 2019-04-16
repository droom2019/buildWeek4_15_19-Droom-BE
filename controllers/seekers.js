const router = require('express').Router();
const Seekers = require('../models/Seekers');

router.post('/', async (req, res) => {
	try {
		const profile = Seekers.add(req.body);
		res.status(201).json(profile);
	} catch (err) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while trying to create that profile'
		});

		throw new Error(err);
	}
});

module.exports = router;
