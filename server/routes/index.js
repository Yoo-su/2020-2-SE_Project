const express=require('express');
const database=require('./database');
const forOrder_tables=require('./forOrder_tables');
const forOrder_menu=require('./forOrder_menu');
const forOrder_takeouts=require('./forOrder_takeouts');
const tableInfo=require('./tableInfo');
const takeOutContent=require('./takeOutContent');
const newOrder=require('./newOrder');
const forCook=require('./forCook');
const forOrderCard=require('./forOrderCard');
const cookComplete=require('./cookComplete');
const served=require('./served');
const orderPay=require('./orderPay');
const takeOutEnd=require('./takeOutEnd');
const login=require('./login');
const addMenu=require('./addMenu');
const fillStock=require('./fillStock');
const aboutSales=require('./aboutSales');
const allWorkers=require('./allWorkers');
const updateSalary=require('./updateSalary');
const removeWorker=require('./removeWorker');
const newWorker=require('./newWorker');
const router=express.Router();

router.use('/newOrder',newOrder);

router.use('/tableInfo',tableInfo);

router.use('/tables', forOrder_tables);

router.use('/menu', forOrder_menu);

router.use('/takeOutOrders',forOrder_takeouts);

router.use('/takeOutContent',takeOutContent);

router.use('/forCook',forCook);

router.use('/cookComplete',cookComplete);

router.use('/served',served);

router.use('/forOrderCard',forOrderCard);

router.use('/orderPay',orderPay);

router.use('/login',login);

router.use('/takeOutEnd',takeOutEnd);

router.use('/fillStock',fillStock);

router.use('/addMenu',addMenu);

router.use('/aboutSales',aboutSales);

router.use('/allWorkers',allWorkers);

router.use('/updateSalary',updateSalary);

router.use('/removeWorker',removeWorker);

router.use('/newWorker',newWorker);

module.exports=router;