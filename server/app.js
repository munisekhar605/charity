const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const cors=require('cors');

const router_user=require('./routers/user');
const router_admin=require('./routers/admin');
const router_charityAdmin=require('./routers/charityAdmin');

const sequelize=require('./util/db')
const Admin=require('./model/admin');
const CharityAdmin=require('./model/charityAdmin');
const Donation_items=require('./model/donation_items');
const Users=require('./model/user');
const Payment = require('./model/paayment');
require('dotenv').config();

app.use(cors());
app.use(bodyparser.json());

app.use('/user',router_user);
app.use('/admin',router_admin);
app.use('/charityAdmin',router_charityAdmin);

Donation_items.belongsTo(CharityAdmin);
CharityAdmin.hasMany(Donation_items);

Payment.belongsTo(Users);
Users.hasMany(Payment);

Payment.belongsTo(CharityAdmin);
CharityAdmin.hasMany(Payment);

Payment.belongsTo(Donation_items);
Donation_items.hasMany(Payment);

Users.belongsToMany(Donation_items,{through:"users_donations"});
Donation_items.belongsToMany(Users,{through:"users_donations"});

sequelize.sync()
.then(res=>app.listen(4000))
.catch(err=>console.log(err))
 