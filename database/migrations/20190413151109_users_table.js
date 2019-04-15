exports.up = function(knex) {
	return knex.schema.createTable('users', tbl => {
		tbl.increments();

		tbl.string('email', 128)
			.notNullable()
			.unique();

		tbl.string('password', 128).notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.cascade().dropTable('users');
};
