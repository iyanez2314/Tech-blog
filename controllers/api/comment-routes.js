const router = require('express').Router();
const { Comment } = require('../../models');

// * GET /api/comments
router.get('/', (req, res)=> {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// * Post /api/comment/
router.post('/', (req, res) => {
Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    blog_id: req.body.blog_id
})
.then(dbCommentData => res.json(dbCommentData))
.catch(err => {
    console.log(err);
    res.status(400).json(err);
})
});

// * Delete /api/comment/:id
router.delete('/:id', (req, res) => {
Comment.destroy({})
})

module.exports = router;