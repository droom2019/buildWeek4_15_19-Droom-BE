const router = require('express').Router();
const Education = require('../models/Education');

// Create job seeker education
router.post('/', async (req, res) => {
	try {
		const education = await Education.add(req.body);
		res.status(201).json(education);
	} catch (err) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while trying to add education'
		});

		throw new Error(err);
	}
});

// Get job seeker education
router.get('/:id', async (req, res) => {
	try {
		const education = await Education.find(req.params.id);
		res.status(200).json(education);
	} catch (err) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while trying to get education'
		});

		throw new Error(err);
	}
});

// Update a single education object by education id
router.put('/:id', async (req, res) => {
	try {
		const updatedEducation = await Education.update(
			req.params.id,
			req.body
		);
		res.status(200).json(updatedEducation);
	} catch (err) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while updating education'
		});

		throw new Error(err);
	}
});

// Delete a single education object by education id
router.delete('/:id', async (req, res) => {
	try {
		const deletedEducation = await Education.remove(req.params.id);
		res.status(200).json(deletedEducation);
	} catch (err) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while deleting education'
		});

		throw new Error(err);
	}
});

module.exports = router;