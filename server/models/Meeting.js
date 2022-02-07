const sequelize = require('../sequelize')
const { DataTypes } = require('sequelize')

const Meeting = sequelize.define('Meeting', {
   idMeeting: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
   },
   descriere: {
       type: DataTypes.STRING,
       validate: {
           min: 3
       }
   },
   url: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
           isUrl: true
       }
   },
   dataCreere: {
       type: DataTypes.DATE,
       defaultValue: Date.now()
   }
},
   {
       tableName: 'Meeting'
   }

)
module.exports = Meeting