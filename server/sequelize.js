const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('test', 'postgres', 'mihneadb', {
    host: 'localhost',
    dialect: 'postgres'
  });

  
sequelize.sync({alter:true}).then(() =>{
    console.log("modele sincronizate");
});

module.exports = sequelize;