const express=require('express')
const router=express.Router();
const athontecation=require('../controllers/athontecation');
const userReq=require('../controllers/userReq.js');
const userAuthentication=require('../servece/jwt.js');
router.post('/login',athontecation.login);
router.post('/signup',athontecation.signup);
router.get('/donationItemsData/:limit',userReq.donationItemsData);
router.post('/paymentCreate',userAuthentication,userReq.paymentCreate)
router.get('/allpayments',userAuthentication,userReq.allpayments);
router.post('/search',userAuthentication,userReq.search);
router.put('/updateuser',userAuthentication,userReq.updateuser);
router.get('/getuserdata',userAuthentication,userReq.getuserdata);
module.exports=router;