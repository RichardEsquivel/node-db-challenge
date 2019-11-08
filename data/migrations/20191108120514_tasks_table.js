
exports.up = function (knex) {
	return knex.schema.createTable('tasks', tbl => {
		tbl.increments()
		tbl.integer('projectId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('projects');
		tbl.varchar('description', 255)
			.notNullable();
		tbl.text('notes', 750)
		tbl.boolean('complete').defaultTo(false);
	})
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('tasks')
};
