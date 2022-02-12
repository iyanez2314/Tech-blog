const router = require('express').Router();
const sequelize = require('../config/connection');
const { blog, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    blog.findAll({
        attributes: [
            'id',
            'blog_url',
            'title'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'blog_id', 'user_id'],
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
    .then(dbBlogData => {
        // pass a single post object into the homepage template
        const posts = dbBlogData.map(blog => blog.get({ plain: true }));
        res.render('homepage', { posts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get('/blog/:id', (req, res) => {
   blog.findOne({
       where: {
           id: req.params.id
       },
       attributes: [
           'id',
           'blog_url',
           'title'
       ],
       include : [
           {
               model: Comment,
               attributes: ['id', 'comment_text', 'user_id'],
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
   .then(dbBlogData => {
       if(!dbBlogData){
           res.status(404).json({ message: 'No post found with this id' });
           return;
       }

       const post = dbBlogData.get({ plain: true });

       res.render('single-post', { blog });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   })
});

module.exports = router;