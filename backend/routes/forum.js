const router = require('express').Router();
const forumController = require('../controllers/forumController');
const newForumPostValidation = require('../middleware/newForumPostValidation');
const isLoggedIn = require('../middleware/isLoggedIn');
const isVerified = require('../middleware/isVerified');


router.post('/new', isLoggedIn, isVerified, newForumPostValidation, forumController.newPost);


module.exports = router;