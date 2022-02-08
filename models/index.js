// * Importing all models
const User = require('./user');
const Comment = require('./comments');
const blog = require('./blog-posts')

// * All the relations for each table


// * User relations
User.hasMany(blog, {
    foreignKey: 'id'
})

User.hasMany(Comment, {
    foreignKey: 'id'
});
// * end to the user relations

// * Comment relations
Comment.belongsTo(User, {
    foreignKey: 'id'
})
// * end to comment relations

// * blog relations
blog.belongsTo(User, {
    foreignKey: 'id'
})

blog.hasMany(Comment, {
    foreignKey: 'id'
})
// * end to blog relations

module.exports = { User, Comment, blog}
