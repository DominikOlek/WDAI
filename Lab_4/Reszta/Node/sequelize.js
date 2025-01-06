const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database2.sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 1000,
        idle: 1000,
    },
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Baza polaczona');
    } catch (error) {
        console.error('Brak polaczenia z baza', error);
    }
})();