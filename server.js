const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookies: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.use(routes)



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// sync sequelize models to the database
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now Listening on ${PORT}`))
});