const express = require('express');

const server = express();

const knex = require('knex')
const knexConfig = require('./knexfile')

const db = knex(knexConfig.development)
const ProjName = require('./projects/project-model.js');
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
	const resourceDesc = req.body.description
	if (!resourceName || !resourceDesc) {
		res.status(401).json({ message: 'Please include a name and a description field!' })
	}

	db('resources')
		.insert({ name: resourceName, description: resourceDesc })
		.then(resourceId => res.status(201).json({ data: resourceId })

		).catch(err => {
			res.status(500).json({ message: 'Failed to post a new resource!' });
		});

})


//Retrieve tasks
server.get('/api/tasks', (req, res) => {
	ProjName.findName(db)
		.then(tasks => {
			res.status(200).json({ data: tasks })
		}).catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Failed to get tasks.' });
		});


})

// Create a new task, check for description and existing id 
server.post('/api/tasks', (req, res) => {
	const taskDes = req.body.description
	const projectIds = req.body.projectId
	if (!taskDes) {
		res.status(400).json({ message: 'Provide a completed task description field!' })
	} else if (!projectIds) {
		res.status(400).json({ message: 'Provide a projectId field with a valid projectId number!' })
	}
	db('projects')
		.select()
		.where({ id: projectIds })
		.then(project => {
			if (project.length > 0) {
				db('tasks')
					.insert(req.body)
					.then(projectIds => {
						ProjName.findName(db)
							.select()
							.where({ projectId: projectIds })
							.then(tasks => {
								res.status(201).json({ data: tasks })
							}).catch(err => {
								res.status(500).json({ message: 'Failed to update task!' });
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
	const projectDesc = req.body.description
	if (!projectName) {
		res.status(401).json({ message: 'Please include completed name field!' })
	}

	db('projects')
		.insert({ name: projectName, description: projectDesc })
		.then(projectId => res.status(201).json({ data: projectId })
		).catch(err => {
			res.status(500).json({ message: 'Failed to post project.' });
		});
})



module.exports = server;


