exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('tasks').truncate()
		.then(function () {
			// Inserts seed entries
			return knex('tasks').insert([
				{ projectId: 1, description: 'remove panels' },
				{ projectId: 2, description: 'fill up oil' },
				{ projectId: 1, description: 'install the frame' },
				{ projectId: 2, description: 'plot out trajectory' },
				{ projectId: 1, description: 'DEEP CLEAN' },
				{ projectId: 1, description: 'clean all interior surfaces' },
				{ projectId: 2, description: 'fill up fuel' }
			]);
		});
};
