const UserResume = require('../models/ResumeSchema.js');
const getProjects = async (req, res) => {
	const allUsers = await UserResume.find();

	res.status(200).json(allUsers);
};

const submitProjects = async (req, res) => {
	const {projectDescription, projectName, githubRepo, previewLink} = await req.body;

	const currentUser = await UserResume.findOne({email: 'samsonrealgreat@gmail.com'});

	if (currentUser) {
		console.log(currentUser.projects);
		try {
			currentUser.projects.push({projectDescription, projectName, githubRepo, previewLink});
			const data = await currentUser.save();
			res.status(201).json(data.projects[data.projects.length - 1]);
		} catch (error) {
			console.log(error.message);
			res.status(402).json('error ' + error.message);
		}
	} else res.status(402).json('user not found');
};

const updateProjects = async (req, res) => {
	const {id} = req.params;
	const {projectDescription, projectName, githubRepo, previewLink} = await req.body;

	const currentUser = await UserResume.findOne({id});
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
	const currentUser = await UserResume.findOne({id});
	if (currentUser) {
		try {
			currentUser.projects.filter(async (project, index) => {
				if (project.id === id) {
					const deletedProject = currentUser.projects.splice(index, 1);
					await currentUser.save();
					res.status(201).json(deletedProject);
				}
			});
		} catch (error) {
			res.status(401).json(error.message);
		}
	} else res.status(404).json('user not found');
};

module.exports = {submitProjects, getProjects, updateProjects, deleteProjects};
