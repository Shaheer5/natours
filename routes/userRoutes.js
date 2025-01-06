const express = require('express');
const router = express.Router();


const getUsers = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This user route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This user route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This user route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This user route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This user route is not yet defined',
  });
};

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
