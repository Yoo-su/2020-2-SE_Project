import conn from "./database";

export const createMenu = async (req, res) => {
  try {
    const menuName = req.body.menuName;
    const menuPrice = req.body.menuPrice;
    const stockPrice = req.body.stockPrice;
    const imgPath = "foodImgs/" + req.file.filename;
    const addMenuSql = `insert into menu values('${menuName}',${menuPrice},500,0,'${imgPath}',1,${stockPrice})`;

    const [rows] = await conn.query(addMenuSql);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.send({ success: false });
  }
};

export const updateMenuActivation = async (req, res) => {
  try {
    const menuName = req.query.menuName;
    const activate = req.query.activate;

    const sql = `update menu set activate=${activate} where menuName='${menuName}'`;
    const [rows] = await con.query(sql);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};

export const getAllActivateMenu = async (req, res) => {
  try {
    let sql = `select * from menu where activate=1`;

    const [rows] = await conn.query(sql);

    return res.status(200).json({ success: true, menu: rows });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};

export const getAllMenu = async (req, res) => {
  try {
    let sql = `select * from menu order by sales desc`;

    const [rows] = await conn.query(sql);

    return res.status(200).json({ success: true, menu: rows });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};

export const updateMenuStock = async (req, res) => {
  try {
    const menuName = req.query.menuName;
    const newAmount = req.query.amount;
    const stockPrice = req.query.stockPrice;
    const minus = newAmount * stockPrice;
    console.log(minus);

    const sql = `update menu set remainStock=remainStock+${newAmount} where menuName='${menuName}'`;
    const sql2 = `insert into account values(date(now()),0,${minus},0,${minus}) on duplicate key 
        update minusTotal=minusTotal+${minus},stockMinus=stockMinus+${minus}`;

    await conn.query(sql);
    await conn.query(sql2);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.send({ success: false });
  }
};
