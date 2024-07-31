const sequelize=require('../util/db');
const Sequelize=require('sequelize');
const Donation_items=sequelize.define('donation_items',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    discription:{
        type:Sequelize.STRING,
        allowNull:false
    },
    img_url:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }

});

module.exports=Donation_items
