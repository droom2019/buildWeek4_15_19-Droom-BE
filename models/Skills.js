const db = require('../database/dbConfig');

module.exports = {
	add,
	find,
	update,
	remove
};

async function add({ userId, seekerSkills }) {
	let { id } = await findSeeker(userId);
	seekerId = id;

	// add seekerId prop to skills object
	const updatedSkills = seekerSkills.map(skill => {
		return { seekerId, seekerSkill: skill };
	});

	// add skills to db
	await db('seeker_skills')
		.insert(updatedSkills)
		.returning('id');

	// return all skills related to seeker profile
	return db('seeker_skills').where({ seekerId });
}

// Find all skills for seeker
async function find(userId) {
	let { id } = await findSeeker(userId);
	seekerId = id;

	return db('seeker_skills').where({ seekerId });
}

async function update(id, skill) {
	await db('seeker_skills')
		.where({ id })
		.update(skill);

	return db('seeker_skills')
		.where({ id })
		.first();
}

async function remove(id) {
	await db('seeker_skills')
		.where({ id })
		.del();

	return parseInt(id, 10);
}

// Find seekerId by userId
function findSeeker(id) {
	return db('seekers')
		.where({ userId: id })
		.select('id')
		.first();
}