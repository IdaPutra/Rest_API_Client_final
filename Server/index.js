require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors'); // Import cors
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes


// Import issues routes
const issuesRoutes = require('./routes/issuesRoute'); 

// Use issues routes in the application under the /issues endpoint
app.use('/issues', issuesRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}



module.exports = app; 