// Import required modules
const fs = require('fs');
const path = require('path');

// Define the path to the JSON file
const jsonFilePath = path.join(__dirname, '..', 'data', 'issues.json');

// Function to read data from the JSON file
function readDataFromFile() {
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    return JSON.parse(data);
}

// Function to write data to the JSON file
function writeDataToFile(data) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 4), 'utf8');
}

// Controller function to get all issues
exports.getAllIssues = async (req, res) => {
    try {
        // Read data from the JSON file
        const issues = readDataFromFile();
        // Send the issues as a response
        res.send(issues);
    } catch (error) {
        // Handle errors
        res.status(500).send('Internal Server Error');
    }
};

// Controller function to get a specific issue by ID
exports.getIssue = async (req, res) => {
    try {
        // Read data from the JSON file
        const issues = readDataFromFile();
        // Find the issue with the specified ID
        const issue = issues.find(i => i.id === parseInt(req.params.id));
        // If issue is not found, send a 404 response
        if (!issue) return res.status(404).send('Issue not found.');
        // Send the issue as a response
        res.send(issue);
    } catch (error) {
        // Handle errors
        res.status(500).send('Internal Server Error');
    }
};

// Controller function to create a new issue
exports.createIssue = async (req, res) => {
    try {
        // Read data from the JSON file
        const issues = readDataFromFile();
        // Generate a new ID for the issue
        const newId = issues.length > 0 ? Math.max(...issues.map(issue => issue.id)) + 1 : 1;
        // Create a new issue object
        const newIssue = {
            id: newId,
            title: req.body.title,
            description: req.body.description,
        };
        // Add the new issue to the list
        issues.push(newIssue);
        // Write updated data back to the JSON file
        writeDataToFile(issues);
        // Send the new issue as a response
        res.send(newIssue);
    } catch (error) {
        // Handle errors
        res.status(500).send('Internal Server Error');
    }
};

// Controller function to update an existing issue
exports.updateIssue = async (req, res) => {
    try {
        // Read data from the JSON file
        const issues = readDataFromFile();
        // Find the index of the issue with the specified ID
        const index = issues.findIndex(i => i.id === parseInt(req.params.id));
        // If issue is not found, send a 404 response
        if (index < 0) return res.status(404).send('Issue not found.');
        // Update the title and description of the issue
        issues[index].title = req.body.title || issues[index].title;
        issues[index].description = req.body.description || issues[index].description;
        // Write updated data back to the JSON file
        writeDataToFile(issues);
        // Send the updated issue as a response
        res.send(issues[index]);
    } catch (error) {
        // Handle errors
        res.status(500).send('Internal Server Error');
    }
};

// Controller function to delete an existing issue
exports.deleteIssue = async (req, res) => {
    try {
        // Read data from the JSON file
        const issues = readDataFromFile();
        // Find the index of the issue with the specified ID
        const index = issues.findIndex(i => i.id === parseInt(req.params.id));
        // If issue is not found, send a 404 response
        if (index < 0) return res.status(404).send('Issue not found.');
        // Remove the issue from the list
        const deletedIssue = issues.splice(index, 1)[0];
        // Write updated data back to the JSON file
        writeDataToFile(issues);
        // Send the deleted issue as a response
        res.send(deletedIssue);
    } catch (error) {
        // Handle errors
        res.status(500).send('Internal Server Error');
    }
};
