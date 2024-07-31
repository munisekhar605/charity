const sequelize=require('../util/db');
const Admin=require('../model/admin');
const CharityAdmin=require('../model/charityAdmin');
const Donation_items=require('../model/donation_items');
const Users=require('../model/user');
const Payment = require('../model/paayment');
const bcript=require('bcrypt');
const JWT=require('jsonwebtoken');
const { where } = require('sequelize');


const charitys=async (req,res,next)=>{
    try{
        const data=await CharityAdmin.findAll({
            attributes: ['id', 'charityName', 'email', 'status']
        });
        res.status(200).send(data);
    }catch(err){
        res.status(404)
    }
}

const payment=async (req,res,next)=>{
    try{
        const data=await Donation_items.findAll();
        res.status(200).send(data);
    }catch(err){
        res.status(404)
    }
}
const updatecharity=async (req,res,next)=>{
    const {name,email,status,id}=req.body
    try{
        const data=await CharityAdmin.findOne({where:{id:id}});
        if (!data) {
             res.status(404).json({ message: 'Charity admin not found' });
        }else{
            data.charityName=name;
        data.email=email;
        data.status=status;
        await data.save()
        }
        
        res.status(200).send('ok')
    }catch(err){
        res.status(404)
    }
}

const allpayments=async (req,res,next)=>{
    const id=req.jwtId;
    try{
        const data=await Payment.findAll({
            include:[
                {
                    model:Users,
                    attributes:['email']
                },
                {
                    model:CharityAdmin,
                    attributes:['email']
                }
            ]
        });
        res.status(200).send(data)
    }catch(err){
        res.status(404);
    }
}

module.exports={
    charitys,
    payment,
    updatecharity,
    allpayments
}