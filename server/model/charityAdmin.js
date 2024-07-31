const Sequelize=require('sequelize');
const sequelize=require('../util/db');

const CharityAdmin=sequelize.define('charityAdmin',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    charityName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    status:{
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue: 'pending'
    }
});
module.exports=CharityAdmin;