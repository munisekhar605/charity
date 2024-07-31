const Sequelize=require('sequelize');
const sequelize=require('../util/db');

const Payment=sequelize.define('payments',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    paymentid:{
        type:Sequelize.STRING,
        allowNull:false
    },
    payment_rf_id:{
        type:Sequelize.STRING,
        allowNull:false
    },
    payment_status:{
        type:Sequelize.STRING,
        allowNull:false
    
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports=Payment;