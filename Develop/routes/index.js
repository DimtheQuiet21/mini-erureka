const router = require('express').Router();

// Import our modular routers for /notes and /feedback
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;
