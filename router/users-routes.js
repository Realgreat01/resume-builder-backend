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
      projectName: 'Verix Data Management Suite',
      projectDescription:
        'Designed a comprehensive data management system to streamline operations and enhance organizational efficiency at Verix Enterprises. This project involved developing a robust database solution and user-friendly interfaces.',
      projectLesson:
        'Mastered advanced data management techniques and user interface design.',
      projectTools: ['SQL', 'React', 'Node.js'],
      githubRepo: 'https://github.com/Realgreat01/verix-dms',
      previewLink: 'https://github.com/Realgreat01/verix-dms',
    },
    {
      projectName: 'Interactive Retail App',
      projectDescription:
        'Developed an e-commerce application for Dev Mobile that supports real-time customer interaction and feedback. This project focused on optimizing user experience and backend efficiency.',
      projectLesson:
        'Gained expertise in real-time data processing and e-commerce platform optimization.',
      projectTools: ['Angular', 'Firebase', 'Stripe API'],
      githubRepo: 'https://github.com/Realgreat01/dev-mobile',
      previewLink: 'https://github.com/Realgreat01/dev-mobile',
    },
    {
      projectName: 'Developer Collaboration Hub',
      projectDescription:
        'Created a collaboration platform for AliExpress Developers Bootcamp, facilitating real-time interaction and project management among developers.',
      projectLesson:
        'Learned to implement real-time collaboration tools and manage large-scale software projects.',
      projectTools: ['Vue.js', 'Node.js', 'Socket.IO'],
      githubRepo: 'https://github.com/Realgreat01/aliexpress-dev',
      previewLink: 'http://verixshop.com',
    },
    {
      projectName: 'Enterprise Resource Planner',
      projectDescription:
        'Implemented a custom ERP system for Verix Enterprises to handle logistics, human resources, and financial planning. The system is tailored to streamline operations and enhance decision-making.',
      projectLesson:
        'Enhanced skills in systems analysis and integrated software solution development.',
      projectTools: ['Python', 'Django', 'PostgreSQL'],
      githubRepo: 'https://github.com/Realgreat01/verix-erp',
      previewLink: 'https://github.com/Realgreat01/verix-erp',
    },
    {
      projectName: 'Mobile Marketplace Platform',
      projectDescription:
        'Launched a mobile marketplace for Dev Mobile, enabling vendors to connect with buyers through an intuitive app interface. The platform supports secure transactions and dynamic content management.',
      projectLesson:
        'Developed a deep understanding of mobile application development and secure payment integration.',
      projectTools: ['Swift', 'Kotlin', 'AWS'],
      githubRepo: 'https://github.com/Realgreat01/mobile-marketplace',
      previewLink: 'https://github.com/Realgreat01/mobile-marketplace',
    },
    {
      projectName: 'Tech Event Web Portal',
      projectDescription:
        'Designed and deployed a web portal for technology event management, including registration, session tracking, and interactive features for event participants.',
      projectLesson:
        'Learned to build scalable web applications tailored for event management.',
      projectTools: ['Laravel', 'Vue.js', 'MySQL'],
      githubRepo: 'https://github.com/Realgreat01/tech-event-portal',
      previewLink: 'https://github.com/Realgreat01/tech-event-portal',
    },
    {
      projectName: 'Data Insights Dashboard',
      projectDescription:
        'Developed a dashboard for Verix Enterprises to visualize key business metrics, integrating data from multiple sources to provide actionable insights.',
      projectLesson:
        'Advanced my skills in data visualization and business intelligence.',
      projectTools: ['React', 'D3.js', 'MongoDB'],
      githubRepo: 'https://github.com/Realgreat01/data-insights-dashboard',
      previewLink: 'https://github.com/Realgreat01/data-insights-dashboard',
    },
    {
      projectName: 'Custom CRM Solutions',
      projectDescription:
        'Built a custom CRM platform for Dev Mobile to manage customer relationships, track interactions, and automate marketing campaigns.',
      projectLesson:
        'Gained experience in CRM development and learned about the integration of marketing automation tools.',
      projectTools: ['Ruby on Rails', 'React', 'PostgreSQL'],
      githubRepo: 'https://github.com/Realgreat01/custom-crm',
      previewLink: 'https://github.com/Realgreat01/custom-crm',
    },
  ];

  const { id } = req.user;
  const currentUser = await UserSchema.findById(id);

  if (currentUser) {
    try {
      currentUser.projects = dataSample;
      await currentUser.save();
      res.status(201).json('Successful');
    } catch (error) {
      res.status(402).json(errorHandler(error));
    }
  } else res.status(402).json('user not found');
});

module.exports = router;
