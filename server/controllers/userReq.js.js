const sequelize=require('../util/db');
const Admin=require('../model/admin');
const CharityAdmin=require('../model/charityAdmin');
const Donation_items=require('../model/donation_items');
const Users=require('../model/user');
const Payment = require('../model/paayment');
const { where } = require('sequelize');
const { Op } = require('sequelize');

const donationItemsData=async(req,res,next)=>{
    const limit=req.params.limit;
    try{
        // const data=await Donation_items.findAll(});
        const data= await Donation_items.findAll({
            where: {
                id: {
                    [Op.gt]: limit
                }
            },
            include: [{
                model: CharityAdmin,
                where: {
                    status: 'Approved'
                },
                attributes: ['charityName']
            }]});
        res.status(200).send(data)
    }catch(err){
        res.status(404);
    }
}
const updateuser=async(req,res,next)=>{
    const {id,name,email}=req.body;

   try{
    const updatedata= await Users.update(
        { name, email },
        { where: { id } }
      );
      res.status(200).send('ok')
   }catch(err){
    res.status(404).send(err)
   }
}
const allpayments=async (req,res,next)=>{
    const id=req.jwtId;
    try{
        const data=await Payment.findAll({
        where:{
            userId:id
        },
        include:[{
            model:CharityAdmin,
            attributes:['charityName']},
            {model:Donation_items,
            attributes:['title']}
        ]
        });
        res.status(200).send(data)
    }catch(err){
        res.status(404);
    }
}


const paymentCreate=async (req,res,next)=>{
    const {charityAdminId,donationItemId}=req.body;
    const userid=req.jwtId;
    const paymentid='id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
    try{
        const datapost=await Payment.create({
        paymentid:paymentid,
        payment_rf_id:'13524343132',
        payment_status:'success',
        userId:userid,
        charityAdminId:charityAdminId,
        donationItemId:donationItemId,
        amount:100
    })
        res.status(200).send('ok')
    }catch(err){
        res.status(404).send(err)
    }
}

const search=async(req,res,next)=>{
    const data=req.body.data;
    console.log(data)
    try{
        const dataget = await CharityAdmin.findAll({
            where: {
                charityName: {
                [Op.like]: `%${data}%`
              }
            },attributes:['charityName'],
              include:[
                {
                    model:Donation_items,
                    attributes:['id','title','discription','img_url','category']
                }
              ]
            
        });
        res.status(200).send(dataget)
    }catch(err){
        res.status(404)
    }

}
const getuserdata=async (req,res,next)=>{
    const id=req.jwtId;
    try{
        const data=await Users.findOne({
            where:{id:id},
            attributes:['name','email','id']
        })
        res.status(200).send(data)
    }catch(err){
        res.status(404).send('err')
    }
}

module.exports={
    donationItemsData,
    updateuser,
    allpayments,
    paymentCreate,
    search,
    getuserdata
}