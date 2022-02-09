const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1,
        blog_url: 'https://handbars.js.com/guide',
        title: 'Handlebars docs'
    })
})

module.exports = router;