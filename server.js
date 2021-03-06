require('dotenv').config();
const express = require('express');
const Sentry = require('@sentry/node');

const middleware = require('./middleware/config');
const authenticate = require('./middleware/authenticate');
const errorMiddleware = require('./middleware/errorReporting');

const authController = require('./controllers/auth');
const seekerController = require('./controllers/seekers');
const educationController = require('./controllers/education');
const experienceController = require('./controllers/experience');
const skillsController = require('./controllers/skills');
const comController = require('./controllers/companies');
const jobsController = require('./controllers/jobs');
const jobSkillsController = require('./controllers/jobSKills');
const matchesController = require('./controllers/matches');
const matchedController = require('./controllers/matched');

// initializations
const server = express();
Sentry.init({
    dsn: process.env.SENTRY_DSN
});

// middleware
middleware(server);

// controllers
server.use('/api/auth', authController);
server.use('/api/seekers', authenticate, seekerController);
server.use('/api/education', authenticate, educationController);
server.use('/api/experience', authenticate, experienceController);
server.use('/api/skills', authenticate, skillsController);
server.use('/api/companies', authenticate, comController);
server.use('/api/jobs', authenticate, jobsController);
server.use('/api/job-skills', authenticate, jobSkillsController);
server.use('/api/matches', authenticate, matchesController);
server.use('/api/matched', authenticate, matchedController);

// error reporting middleware (Must be after all requests)
errorMiddleware(server);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Sanity check' });
});

if (require.main == module) {
    server.listen(process.env.PORT, () => {
        console.log(
            `Server is running at http://localhost:${
				process.env.PORT
			}/`
        );
    });
} else {
    module.exports = server;
}