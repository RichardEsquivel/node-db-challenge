//creating projects table initially
exports.up = function (knex) {
	return knex.schema.createTable('projects', tbl => {
		tbl.increments()
		tbl.varchar('name', 255)
			.notNullable();
		tbl.varchar('description', 255);
		tbl.boolean("complete").defaultTo(false);
	})
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('projects')
};
