const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Posts, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// * GET all posts
router.get('/', (req, res) => {
    Posts.findAll({
        attributes: ['id', 'post_url', 'title'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
                 
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// * GET all post by id
router.get('/:id', (req, res) => {
    Posts.findOne({
        where:{
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData  => {
        if(!dbPostData){
            res.status(400).json({ message: 'There is no post wih that id' })
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.post('/', withAuth ,(req, res) => {
    Posts.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});


router.put('/:id', (req, res) => {
    Posts.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500);
    })
})

module.exports = router;