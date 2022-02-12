const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posts, User, Comment } = require('../models');

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
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get('/post/:id', (req, res) => {
   Posts.findOne({
       where: {
           id: req.params.id
       },
       attributes: ['id', 'post_url', 'title'],
       include : [
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
   .then(dbPostData => {
       if(!dbPostData){
           res.status(404).json({ message: 'No post found with this id' });
           return;
       }

       const post = dbPostData.get({ plain: true });

       res.render('single-post', {
           post,
           loggedIn: req.session.loggedIn
       });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   })
});

module.exports = router;