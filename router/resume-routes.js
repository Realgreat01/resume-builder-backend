const express = require('express');
const router = express.Router();

const {
	submitBasicDetails,
	getBasicDetails,
	updateBasicDetails,
} = require('../controller/basic-details');
const {
	submitContactDetails,
	getContactDetails,
	updateContactDetails,
} = require('../controller/contact-details');

// Projects
const {
	submitProjects,
	getProjects,
	updateProjects,
	deleteProjects,
} = require('../controller/projects');

// Experience
const {
	submitExperience,
	getExperience,
	updateExperience,
	deleteExperience,
} = require('../controller/experience.js');

// Skills Section
const {submitSkills, getSkills} = require('../controller/skills.js');

// Education
const {
	submitEducation,
	getEducation,
	updateEducation,
	deleteEducation,
} = require('../controller/education.js');

// Routes
router.get('/basic-details', getBasicDetails);
router.post('/basic-details', submitBasicDetails);
router.put('/basic-details', updateBasicDetails);

// contact details
router.get('/contact-details', getContactDetails);
router.post('/contact-details', submitContactDetails);
router.put('/contact-details', updateContactDetails);

// Projects routes
router.get('/projects', getProjects);
router.post('/projects', submitProjects);
router.put('/projects/:id', updateProjects);
router.delete('/projects/:id', deleteProjects);

router.get('/experience', getExperience);
router.post('/experience', submitExperience);
router.put('/experience/:id', updateExperience);
router.delete('/experience/:id', deleteExperience);

router.get('/skills', getSkills);
router.post('/skills', submitSkills);

router.get('/education', getEducation);
router.post('/education', submitEducation);
router.put('/education/:id', updateEducation);
router.delete('/education/:id', deleteEducation);

module.exports = router;
