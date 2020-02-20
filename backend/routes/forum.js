const router = require('express').Router();
const forumController = require('../controllers/forumController');
const newForumPostValidation = require('../middleware/newForumPostValidation');
const isLoggedIn = require('../middleware/isLoggedIn');


router.post('/new', isLoggedIn, newForumPostValidation, forumController.newPost);


module.exports = router;