// * Importing all models
const User = require('./user');
const Comment = require('./comments');
const Posts = require('./posts')

User.hasMany(Posts, {
    foreignKey: 'user_id'
  });


  Posts.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });

  Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  Comment.belongsTo(Posts, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  Posts.hasMany(Comment, {
    foreignKey: 'post_id'
  });


module.exports = { User, Comment, Posts}
