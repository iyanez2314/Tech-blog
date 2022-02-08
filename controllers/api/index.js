const router = require('express').Router();
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const blogPosts = require('./blog-routes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/blog-posts', blogPosts);

module.exports = router;