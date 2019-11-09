

module.exports = {
	findName
}

function findName(db) {
	return db('tasks as t')
		.join('projects as p', 'p.Id', 't.projectId')
		.select('p.name', 'p.description as ProjectDescription', 't.description as TaskDescription', 't.notes', 't.complete', 't.id ')
		.orderBy('p.name')
}