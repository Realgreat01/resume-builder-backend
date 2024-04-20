const UserSchema = require('../../models/UserSchema.js');
const errorHandler = require('../../errors');

const getProjects = async (req, res) => {
  const { id } = req.user;
  const currentUser = await UserSchema.findById(id);
  res.status(200).json(currentUser.projects);
};

const submitProjects = async (req, res) => {
  const { id } = req.user;
  const currentUser = await UserSchema.findById(id);

  if (currentUser) {
    try {
      currentUser.projects.push(req.body);
      const data = await currentUser.save();
      res.status(201).json(data.projects[data.projects.length - 1]);
    } catch (error) {
      res.status(402).json(errorHandler(error));
    }
  } else res.status(402).json('user not found');
};

const updateProjects = async (req, res) => {
  const { id } = req.params;
  const userID = req.user.id;

  const currentUser = await UserSchema.findById(userID);
  if (currentUser) {
    try {
      const index = currentUser.projects.findIndex(
        project => project.id === id
      );
      if (index >= 0) {
        currentUser.projects[index] = req.body;
        currentUser.save((err, data) => {
          if (err) return res.status(500).json(errorHandler(err));
          return res.status(201).json(data.projects[index]);
        });
      } else if (
        currentUser.projects.some(project => project.id === id) === false
      ) {
        return res
          .status(201)
          .json('Selected project has been recently modified');
      }
    } catch (error) {
      return res.status(500).json(errorHandler(error));
    }
  } else res.status(404).json('user not found');
};

const deleteProjects = async (req, res) => {
  const { id } = await req.params;
  const userID = await req.user.id;
  const currentUser = await UserSchema.findById(userID);

  if (currentUser) {
    try {
      currentUser.projects.pull(id);
      const deletedProject = await currentUser.save();
      return res.status(201).json(deletedProject.projects);
    } catch (error) {
      res.status(401).json(errorHandler(error));
    }
  } else res.status(404).json('user not found');
};

module.exports = {
  submitProjects,
  getProjects,
  updateProjects,
  deleteProjects,
};
