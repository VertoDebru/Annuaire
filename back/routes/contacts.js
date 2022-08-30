const express = require('express');
const router = express.Router();

// Controllers
const ctrlContacts = require('../controllers/contacts');

router.post('/', ctrlContacts.postContact);
router.get('/', ctrlContacts.getContact);

module.exports = router;
