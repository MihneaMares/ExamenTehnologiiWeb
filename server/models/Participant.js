const sequelize = require('../sequelize')
const { DataTypes } = require('sequelize')

const Participant = sequelize.define('participant', {
   idParticipant: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
   },
   numeParticipant: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
           min: 5
       }
   }, 
},
   {
       tableName: 'Participant'
   }
)
module.exports = Participant