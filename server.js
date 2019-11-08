const express = require('express');

const server = express();

const knex = require('knex')
const knexConfig = require('./knexfile')

const db = knex(knexConfig.development)

server.use(express.json());


//Retrieve projects
server.get('/api/projects', (req, res) => {
	db('projects')
		.then(projects => {
			res.json({ data: projects })
		}).catch(err => {
			res.status(500).json({ message: 'Failed to get projects' });
		});

})

//Retrieve resources
server.get('/api/resources', (req, res) => {
	db('resources')
		.then(resources => {
			res.status(200).json({ data: resources })
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get resources' });
		});
})

// Post new resource, notes are optional
server.post('/api/resources', (req, res) => {
	const resourceName = req.body.name
	if (!resourceName) {
		res.status(401).json({ message: 'Please include a name field!' })
	}

	db('resources')
		.insert({ name: resourceName })
		.then(resourceId => res.status(201).json({ data: resourceId })

		).catch(err => {
			res.status(500).json({ message: 'Failed to post a new resource!' });
		});

})


//Retrieve tasks
server.get('/api/tasks', (req, res) => {
	db('tasks')
		.then(tasks => {
			db('projects')
				.then(projects => {
					console.log("this is your response!", projects)
					res.status(200).json({ data: tasks })
				})
			res.status(200).json({ data: tasks })
		}).catch(err => {
			res.status(500).json({ message: 'Failed to get tasks.' });
		});


})

// Create a new task, check for description and existing id 
server.post('/api/tasks', (req, res) => {
	const taskDes = req.body.description
	const projectId = req.body.projectId
	if (!taskDes) {
		res.status(400).json({ message: 'Provide a completed task description field!' })
	} else if (!projectId) {
		res.status(400).json({ message: 'Provide a projectId field with a valid projectId number!' })
	}
	db('projects')
		.select()
		.where({ id: projectId })
		.then(project => {
			if (project.length > 0) {
				db('tasks')
					.insert(req.body)
					.then(() => {
						db('tasks')
							.select()
							.where({ projectId: projectId })
							.then(tasks => {
								res.status(201).json({ data: tasks })
							}).catch(err => {
								res.status(500).json({ message: 'Failed to post a new resource!' });
							});
					}).catch(err => {
						res.status(500).json({ message: 'Failed to post a new resource!' });
					});
			} else {
				res.status(400).json({ message: "That projectId does not exist!" })
			}
		})
})

//post a new project with a required name
server.post('/api/projects', (req, res) => {
	const projectName = req.body.name
	if (!projectName) {
		res.status(401).json({ message: 'Please include completed name field!' })
	}

	db('projects')
		.insert({ name: projectName })
		.then(projectId => res.status(201).json({ data: projectId })
		).catch(err => {
			res.status(500).json({ message: 'Failed to post project.' });
		});
})



module.exports = server;


