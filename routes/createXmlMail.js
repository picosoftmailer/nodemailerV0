const express = require('express');
const router = express.Router();
const createXmlMaillController = require('../controllers/createXmlMaillController');

router.post('/create-email', createXmlMaillController.createMail);

module.exports = router;