const router = require('express').Router();
const forumController = require('../controllers/forumController');
const newForumPostValidation = require('../middleware/newForumPostValidation');


router.post('/new', newForumPostValidation, forumController.newPost);


module.exports = router;