const express=require('express');
const order=require('./order');
const cook=require('./cook');
const menu=require('./menu');
const user=require(',/user');
const store=require('./store');

const router=express.Router();

router.use('/order', order);

router.use('/cook', cook);

router.use('/menu', menu);

router.use('/user', user);

router.use('/store', store);

module.exports=router;