const seedUser = require('./user-seeds')

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('----------')
    await seedUser();

    process.exit(0);
}

seedAll();