
exports.up = function (knex) {
	return knex.schema.createTable('project_resources', tbl => {
		tbl.increments()
		tbl.integer('projectId')
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('projects');
		tbl.integer('resourcesId')
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('resources');
	})
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('project_resources')
};
