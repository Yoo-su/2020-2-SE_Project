const express=require('express');
const router=express.Router();
router.use(express.json());
const multer=require('multer');
const upload = multer({ dest: 'public/foodImgs/' })
const con=require("./database");


router.post('/',upload.single('menuImg'),async(req,res)=>{
  try{
      const menuName=req.body.menuName;
      const menuPrice=req.body.menuPrice;
      const stockPrice=req.body.stockPrice;
      const imgPath='foodImgs/'+req.file.filename;
      const addMenuSql=`insert into menu values('${menuName}',${menuPrice},500,0,'${imgPath}',1,${stockPrice})`;

      const [rows]=await con.query(addMenuSql);
      return res.status(200).json({success:true});

  }catch(err){
      console.log(err);
      return res.send({success:false});
  }
});

module.exports=router;