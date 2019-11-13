
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('resources').truncate()
		.then(function () {
			// Inserts seed entries
			return knex('resources').insert([
				{ name: 'powerdrill' },
				{ name: 'oil' },
				{ name: 'aluminum frame' },
				{ name: 'super Computer' },
				{ name: 'bucket of gumption' },
				{ name: 'pressure washer' },
				{ name: 'jet fuel' }
			]);
		});
};
