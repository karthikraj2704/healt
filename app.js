const express = require('express'); // to create api
const mongoose = require('mongoose'); // connect to bd
const bodyParser = require('body-parser'); // to parse json data
const app = express();  // create api

const port = process.env.PORT || 3000;  // port to listen on


// Middleware
app.use(bodyParser.json());  // to parse json data


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/health', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Routes
const serviceRoutes = require('./routers/services');
app.use('/api/services', serviceRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
