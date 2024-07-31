const S3=require('../servece/s3.js');
const sequelize=require('../util/db');
const Admin=require('../model/admin');
const CharityAdmin=require('../model/charityAdmin');
const Donation_items=require('../model/donation_items');
const Users=require('../model/user');
const Payment = require('../model/paayment');
const bcript=require('bcrypt');
const JWT=require('jsonwebtoken');
const { where } = require('sequelize');
const { Op } = require('sequelize');

const donationItemsDataCreate=async(req,res,next)=>{
    const {title,category,description}=req.body;
    const charityAdminId=req.jwtId;
    const file=req.file;
    const imgUrl=await S3(file);
    console.log(imgUrl)
    try{
        const datacreate= await Donation_items.create({
            title:title,
            discription:description,
            img_url:imgUrl,
            category:category,
            charityAdminId:charityAdminId
        })
        res.status(200);
    }catch(err){
        res.status(404);         
    }
}

const donationItemsData=async (req,res,next)=>{
    const charityAdminId=req.jwtId;
    const lastId=req.params.lastId;
    console.log(lastId)
   try{
    const data= await Donation_items.findAll({where:{charityAdminId:charityAdminId, id:{[Op.gt]:lastId}}});
    res.status(200).send(data)
   }catch(err){
    res.status(404).send('err')
   }
}

const allpayments=async (req,res,next)=>{
    const id=req.jwtId;
    try{
        const data=await Payment.findAll({
            where:{charityAdminId:id},
            include:[
                {
                    model:Users,
                    attributes:['email']
                },{
                    model:Donation_items,
                    attributes:['title']
                }
            ]
        });
        res.status(200).send(data)
    }catch(err){
        res.status(404);
    }
}
const donationItemDelete=async (req,res,next)=>{
    const {id}=req.params;
   try{
    const d=await Donation_items.destroy({where:{id:id}});
    res.status(200).send('ok');
   }catch(err){
    res.status(404).send('ok');
   }

}
const donationItemUpdate=(req,res,next)=>{
    
}

module.exports={
    donationItemsDataCreate,
    donationItemsData,
    allpayments,
    donationItemDelete,
    donationItemUpdate
}