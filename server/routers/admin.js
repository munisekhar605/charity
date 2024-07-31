const express=require('express')
const router=express.Router();
const athontecation=require('../controllers/athontecation');
const adminReq=require('../controllers/adminReq');
const userAuthentication=require('../servece/jwt');

router.post('/login',athontecation.adminlogin);
router.post('/signup',athontecation.adminsignup);

router.get('/charitys',userAuthentication,adminReq.charitys);
router.post('/updatecharity',userAuthentication,adminReq.updatecharity);
router.get('/allpayments',userAuthentication,adminReq.allpayments);
module.exports=router;