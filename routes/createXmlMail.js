const express = require('express');
const router = express.Router();
const createXmlMaillController = require('../controllers/createXmlMaillController');

router.post('/create-email', createXmlMaillController.createMail);

//**************************************************
// Export the router
module.exports = router;
//**************************************************