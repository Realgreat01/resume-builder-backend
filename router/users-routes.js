const express = require('express');
const router = express.Router();
const UserSchema = require('../models/UserSchema.js');

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

router.post('/dummy-data', async (req, res) => {
  const dataSample = [
    {
      company: 'Microsoft Corporation',
      contributions:
        '<p><span style="color: var(--tw-prose-bold);">Led a team of four developers</span> in a successful migration of legacy systems to a modern microservices architecture, which improved scalability and maintainability of backend services.</p>',
      startDate: '2022-10-10T00:00:00.000Z',
      endDate: '2024-01-01T00:00:00.000Z',
      role: 'Frontend Developer',
    },
  ];

  const { id } = req.user;
  const currentUser = await UserSchema.findById(id);

  if (currentUser) {
    try {
      currentUser.experience = dataSample;
      await currentUser.save();
      res.status(201).json('Successful');
    } catch (error) {
      res.status(402).json(error);
    }
  } else res.status(402).json('user not found');
});

module.exports = router;
