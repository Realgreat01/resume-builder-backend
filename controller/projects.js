const UserResume = require('../models/ResumeSchema.js');
const errorHandler = require('../errors');
const getProjects = async (req, res) => {
	const {id} = req.user;
	const currentUser = await UserResume.findById(id);
	res.status(200).json(currentUser.projects);
};

const submitProjects = async (req, res) => {
	const {id} = req.user;
	const {projectDescription, projectName, githubRepo, previewLink} = await req.body;
	const currentUser = await UserResume.findById(id);

	if (currentUser) {
		try {
			currentUser.projects.push({projectDescription, projectName, githubRepo, previewLink});
			const data = await currentUser.save();
			res.status(201).json(data.projects[data.projects.length - 1]);
		} catch (error) {
			res.status(402).json(errorHandler(error));
		}
	} else res.status(402).json('user not found');
};

const updateProjects = async (req, res) => {
	const {id} = req.params;
	const userID = req.user.id;
	const {projectDescription, projectName, githubRepo, previewLink} = await req.body;

	const currentUser = await UserResume.findById(userID);
	if (currentUser) {
		try {
			currentUser.projects.filter(async (project, index) => {
				if (project.id === id) {
					currentUser.projects[index] = {
						projectDescription,
						projectName,
						githubRepo,
						previewLink,
					};
					await currentUser.save();
					res.status(201).json(currentUser.projects[index]);
				}
			});
		} catch (error) {
			res.status(401).json(error.message);
		}
	} else res.status(404).json('user not found');
};

const deleteProjects = async (req, res) => {
	const {id} = await req.params;
	const userID = await req.user.id;
	const currentUser = await UserResume.findById(userID);

	if (currentUser) {
		try {
			currentUser.projects.find(async (project, index) => {
				if (project.id === id) {
					currentUser.projects.splice(index, 1);
					const deleted = await currentUser.save();
					return res.status(201).json(deleted.projects);
				}
			});
		} catch (error) {
			res.status(401).json(error.message);
		}
	} else res.status(404).json('user not found');
};

module.exports = {submitProjects, getProjects, updateProjects, deleteProjects};
