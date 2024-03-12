// Import the required modules
const express = require('express');
// Create a router instance
const router = express.Router();
// Import the issues controller
const issuesController = require('../controllers/issuesController');

// Define routes for different CRUD operations

// Route to get all issues
router.get('/', issuesController.getAllIssues);

// Route to get a specific issue by ID
router.get('/:id', issuesController.getIssue);

// Route to create a new issue
router.post('/', issuesController.createIssue);

// Route to update an existing issue by ID
router.put('/:id', issuesController.updateIssue);

// Route to delete an existing issue by ID
router.delete('/:id', issuesController.deleteIssue);

// Export the router
module.exports = router;
