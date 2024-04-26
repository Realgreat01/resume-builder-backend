const express = require('express');
const router = express.Router();

const {
  submitBasicDetails,
  getBasicDetails,
  updateBasicDetails,
} = require('../controller/user/basic-details.js');

const {
  submitBioDetails,
  getBioDetails,
  updateBioDetails,
} = require('../controller/user/bio-details.js');

const {
  submitContactDetails,
  getContactDetails,
  updateContactDetails,
} = require('../controller/user/contact-details');

// Projects
const {
  submitProjects,
  getProjects,
  updateProjects,
  deleteProjects,
} = require('../controller/user/projects');

// Experience
const {
  submitExperience,
  getExperience,
  updateExperience,
  deleteExperience,
} = require('../controller/user/experience.js');

// Skills Section
const { submitSkills, getSkills } = require('../controller/user/skills.js');

// Education
const {
  submitEducation,
  getEducation,
  updateEducation,
  deleteEducation,
} = require('../controller/user/education.js');

// Routes
router.get('/basic-details', getBasicDetails);
router.post('/basic-details', submitBasicDetails);
router.put('/basic-details', updateBasicDetails);

// Bio Details
router.get('/bio-details', getBioDetails);
router.post('/bio-details', submitBioDetails);
router.put('/bio-details', updateBioDetails);

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
