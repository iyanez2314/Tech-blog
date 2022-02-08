const router = require('express').Router();
const { blog, User } = require('../../models');

// * GET all blog posts
router.get('/', (req, res) => {
    blog.findAll({
        attributes: ['id', 'blog_url', 'title'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// * GET all blog post by id
router.get('/:id', (req, res) => {
    blog.findOne({
        where:{
            id: req.params.id
        },
        include : [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbBlogData  => {
        if(!dbBlogData){
            res.status(400).json({ message: 'There is no post wih that id' })
            return;
        }
        res.json(dbBlogData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
    blog.create({
        title: req.body.title,
        blog_text: req.body.blog_text,
        user_id: req.body.user_id
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router;