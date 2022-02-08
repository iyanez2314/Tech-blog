const express = require('express');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// sync sequelize models to the database
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Now Listening on ${PORT}`))
});