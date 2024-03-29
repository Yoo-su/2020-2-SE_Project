import conn from "./database";

export const getSalesInfo = async (req, res) => {
  try {
    const sql = `select * from sales order by orderTime desc limit 200`;
    const sql2 = `select sec_to_time(avg(timediff(cookTime,orderTime))) as waitTime from sales;`;
    const sql3 = `select sec_to_time(avg(timediff(payTime,orderTime))) as spendTime from sales where orderType not in(0)`;

    const todayTableSalesCount = `select count(*) as ttsc from sales where orderType not in(0) and datediff(now(),orderTime)=0`;
    const todayTakeOutSalesCount = `select count(*) as ttosc from sales where orderType in(0) and datediff(now(),orderTime)=0`;

    const [rows] = await conn.query(sql);
    const [rows2] = await conn.query(sql2);
    const [rows3] = await conn.query(sql3);
    const [rows4] = await conn.query(todayTableSalesCount);
    const [rows5] = await conn.query(todayTakeOutSalesCount);

    return res.status(200).json({
      success: true,
      salesInfo: rows,
      waitAvg: rows2[0].waitTime,
      spendAvg: rows3[0].spendTime,
      todayTableSales: rows4[0].ttsc,
      todayTakeOutSales: rows5[0].ttosc,
    });
  } catch (err) {
    console.log(err);
    return res.send({ success: false });
  }
};

export const getAccountInfo = async (req, res) => {
  try {
    const sql = `select * from account order by dateInfo asc`;

    const monthlyTotal = `select sum(salesTotal-minusTotal) as soon from account where month(dateInfo)=month(now())`;

    const [rows] = await conn.query(sql);
    const [rows2] = await conn.query(monthlyTotal);

    return res.status(200).json({
      success: true,
      account: rows,
      monthlySoon: rows2[0].soon,
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};
