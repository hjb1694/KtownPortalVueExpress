const router = require('express').Router();
const forumController = require('../controllers/forumController');
const newForumPostValidation = require('../middleware/newForumPostValidation');
const isLoggedIn = require('../middleware/isLoggedIn');
const isVerfied = require('../middleware/isVerified');


router.post('/new', isLoggedIn, isVerfied, newForumPostValidation, forumController.newPost);


module.exports = router;