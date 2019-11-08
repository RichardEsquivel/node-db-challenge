
exports.up = function (knex) {
	return knex.schema.createTable('resources', tbl => {
		tbl.increments()
		tbl.varchar('name', 255)
			.notNullable()
			.unique();
		tbl.varchar('description');
	})
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('resources')
};
