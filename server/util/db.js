const sequelize=require('sequelize');

const Sequelize=new sequelize('charity_web','root','1122',{
host:"localhost",
dialect:"mysql"
});
module.exports=Sequelize;