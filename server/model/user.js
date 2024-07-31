const Sequelize=require('sequelize');
const sequelize=require('../util/db');


const Users=sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    name:{
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
    }
});

module.exports=Users;