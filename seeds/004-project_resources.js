exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('project_resources').truncate()
		.then(function () {
			// Inserts seed entries
			return knex('project_resources').insert([
				{ projectId: 1, resourcesId: 1 },
				{ projectId: 2, resourcesId: 2 },
				{ projectId: 1, resourcesId: 3 },
				{ projectId: 2, resourcesId: 4 },
				{ projectId: 1, resourcesId: 5 },
				{ projectId: 1, resourcesId: 6 },
				{ projectId: 2, resourcesId: 7 },
				{ projectId: 2, resourcesId: 5 }

			]);
		});
};
