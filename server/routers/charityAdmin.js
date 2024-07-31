const express=require('express')
const router=express.Router();
const athontecation=require('../controllers/athontecation');
const charityAdminReq=require('../controllers/charityAdminReq');
const multer = require('multer');
const userAuthentication=require('../servece/jwt');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/login',athontecation.charitylogin);
router.post('/signup',athontecation.charitysignup);
router.post('/donationItemsDataCreate',userAuthentication,upload.single('img'),charityAdminReq.donationItemsDataCreate);
router.get('/donationItemsData/:lastId',userAuthentication,charityAdminReq.donationItemsData);
router.get('/allpayments',userAuthentication,charityAdminReq.allpayments);
router.delete('/donationItemDelete/:id',charityAdminReq.donationItemDelete)

module.exports=router;
