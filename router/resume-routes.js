const express = require('express');
const router = express.Router();

const {submitBasicDetails, getBasicDetails} = require('../controller/basic-details');
const {submitProjects, getProjects} = require('../controller/projects');
const {submitExperience, getExperience} = require('../controller/experience.js');
const {submitSkills, getSkills} = require('../controller/skills.js');
const {submitEducation, getEducation} = require('../controller/education.js');

router.get('/basic-details', getBasicDetails);
router.post('/basic-details', submitBasicDetails);

router.get('/projects', getProjects);
router.post('/projects', submitProjects);

router.get('/experience', getExperience);
router.post('/experience', submitExperience);

router.get('/skills', getSkills);
router.post('/skills', submitSkills);

router.get('/education', getEducation);
router.post('/education', submitEducation);

module.exports = router;
