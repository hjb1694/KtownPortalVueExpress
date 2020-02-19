const router = require('express').Router();
const authController = require('../controllers/authController');
const registrationValidation = require('../middleware/registrationValidation');

router.post('/register', registrationValidation, authController.register);


module.exports = router;