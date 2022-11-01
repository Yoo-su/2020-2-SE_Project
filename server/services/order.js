import conn from "./database";
import { GenerateSerialNumber } from "../util/generateSerialNum";

export const getTableInfo = async (req, res) => {
  try {
    const tableId = req.query.tableId;
    const sql = `select isEmpty from sicktak where sicktakId=${tableId}`;
    const [isEmpty] = await conn.query(sql);

    if (isEmpty[0].isEmpty === 0) {
      // 빈 테이블 아닌 경우.

      const sql2 = `select * from customerorder where sicktak_sicktakId=${tableId}`;
      const [orders] = await conn.query(sql2);

      //상태별 분류
      let cooking = [];
      let prepared = [];
      let served = [];
      let orderIds = [];
      for (let i = 0; i < orders.length; i++) {
        orderIds.push(orders[i].orderId);
        if (orders[i].state === "cooking") cooking.push(orders[i]);
        else if (orders[i].state === "prepared") prepared.push(orders[i]);
        else served.push(orders[i]);
      }

      let orderId = 0;
      let orderPrice = 0;
      let allContent = [];
      let sql3 = ``;
      for (let i = 0; i < orders.length; i++) {
        orderId = orders[i].orderId;
        orderPrice = orderPrice + orders[i].totalPrice;
        sql3 = `select menu_menuName, count, price from orderContent where order_orderId=${orderId}`;
        const [rows] = await conn.query(sql3);

        for (let j = 0; j < rows.length; j++) {
          allContent.push({
            menuName: rows[j].menu_menuName,
            count: rows[j].count,
            price: rows[j].price,
          });
        }
      }

      let state = "";
      if (prepared.length > 0) state = "prepared";
      else if (
        prepared.length === 0 &&
        cooking.length > 0 &&
        served.length >= 0
      )
        state = "cooking";
      else if (
        prepared.length === 0 &&
        cooking.length === 0 &&
        served.length > 0
      )
        state = "served";

      return res.status(200).json({
        success: true,
        tableId: tableId,
        empty: false,
        state: state,
        order: orderIds,
        total: orderPrice,
        content: allContent,
      });
    } else if (isEmpty === 1) {
      return res.status(200).json({ empty: true });
    }
  } catch (err) {
    return res.send(err);
  }
};

export const getOrderInfo = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const sql = `select menu_menuName, count, price from orderContent where order_orderId=${orderId}`;
    const sql2 = `select sicktak_sicktakId from customerorder where orderId=${orderId}`;

    const [rows] = await conn.query(sql);
    const [rows2] = await conn.query(sql2);

    return res.status(200).json({
      success: true,
      content: rows,
      tableId: rows2,
    });
  } catch (err) {
    return res.send({ success: false });
  }
};

export const getAllTable = async (req, res) => {
  try {
    let sql = `select * from sicktak`;
    const [rows] = await conn.query(sql);
    return res.status(200).json({ success: true, tables: rows });
  } catch (err) {
    return res.send(err);
  }
};

export const createNewOrder = async (req, res) => {
  try {
    const tableId = req.body.tableId;
    const content = req.body.content;
    const total = req.body.total;

    const sql = `update sicktak set isEmpty='0' where sicktakId=${tableId}`; //테이블 empty 변경

    if (tableId !== 0) {
      const [rows1] = await conn.query(sql);
    }

    //랜덤한 주문 아이디 생성
    let randId = 0;
    let uniqueOrderSql = ``;
    while (true) {
      randId = Math.random() * (1200 - 1000) + 1000;
      uniqueOrderSql = `select * from customerorder where orderId=${randId}`;
      const [aleadyExist] = await conn.query(uniqueOrderSql);
      if (aleadyExist.length === 0) break;
    }

    const sql2 = `insert into customerorder values (${randId},'cooking',${total},${tableId},now(),'-')`;

    const [rows2] = await conn.query(sql2);

    //랜덤한 주문 콘텐츠 아이디 생성
    let randId2 = 0;
    for (let i = 0; i < content.length; i++) {
      while (true) {
        randId2 = Math.random() * (20000 - 10000) + 10000;
        const [aleadyExist2] = await conn.query(
          `select * from ordercontent where contentId=${randId2}`
        );
        if (aleadyExist2.length === 0) break;
      }
      const sql3 = `insert into ordercontent values(${randId2},${randId},'${content[i].menuName}',${content[i].count},${content[i].price})`;
      const [rows3] = await conn.query(sql3);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.send({ success: false });
  }
};

export const updateOrderStateToServed = async (req, res) => {
  try {
    const tableId = req.query.tableId;
    const sql = `update customerorder set state='served' where sicktak_sicktakID=${tableId} and state='prepared'`;

    const [rows] = await conc.query(sql);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.send({ success: false });
  }
};

export const createOrderHistory = async (req, res) => {
  try {
    const tableId = req.body.tableId;
    const content = req.body.content;
    const totalPrice = req.body.total;

    let contentString = "";
    const contentNames = content.map((c) => c.menuName);
    const set = new Set(contentNames);

    for (let item of set) {
      const filtered = content.filter((c) => c.menuName === item);

      const itemCount =
        filtered.length === 1
          ? filtered[0].count
          : filtered.reduce(function (cur, next) {
              return cur.count + next.count;
            });

      contentString = contentString
        .concat(item)
        .concat(`(${itemCount.toString()}) `);

      const [plusSale] = await conn.query(
        `update menu set sales=sales+${itemCount} where menuName='${item}'`
      );
      const [minusStock] = await conn.query(
        `update menu set remainStock=remainStock-${itemCount} where menuName='${item}'`
      );
    }

    const serialKey = GenerateSerialNumber("0000000000-0000000000");

    const findFirstOrderTime = `select receiveTime from customerorder where sicktak_sicktakId=${tableId} order by receiveTime asc`;
    const [receiveTimes] = await conn.query(findFirstOrderTime);
    const firstReceive = receiveTimes[0].receiveTime;

    const findLastPreparedTime = `select preparedTime from customerorder where sicktak_sicktakId=${tableId} order by preparedTime desc`;
    const [preparedTimes] = await conn.query(findLastPreparedTime);
    const lastPrepared = preparedTimes[0].preparedTime;

    const recordOrder = `insert into sales (serialKey, orderType, orderPrice, orderTime, cookTime, payTime, contentInOrder)
       values ('${serialKey}', ${tableId}, ${totalPrice}, '${firstReceive}',
       '${lastPrepared}', now(),'${contentString}')`;

    const sql = `delete from ordercontent where order_orderId in (select orderId from customerorder where sicktak_sicktakId=${tableId})`;
    const sql2 = `delete from customerorder where sicktak_sicktakId=${tableId}`;
    const sql3 = `update sicktak set isEmpty=1 where sicktakId=${tableId}`;
    const sql4 = `insert into account values(date(now()),${totalPrice},0,0,0) on duplicate key update salesTotal=salesTotal+${totalPrice}`;

    await conn.query(recordOrder);
    await conn.query(sql);
    await conn.query(sql2);
    await conn.query(sql3);
    await conn.query(sql4);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.send({ success: false });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const tableId = req.query.tableId;
    const sql = `delete from customerorder where sicktak_sicktakId=${tableId}`;
    const sql2 = `update sicktak set isEmpty=1 where sicktakId=${tableId}`;
    const sql3 = `delete from ordercontent where order_orderId in (select orderId from customerorder where sicktak_sicktakId=${tableId})`;

    await conn.query(sql3);
    await conn.query(sql2);
    await conn.query(sql);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};

export const updateOrderStateToPrepared = async (req, res) => {
  try {
    const orderId = req.query.orderId;

    const sql = `update customerorder set state='prepared',preparedTime=now() where orderId='${orderId}'`;

    const [rows] = await conn.query(sql);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.send({ success: false });
  }
};

export const createTakeoutOrderHistory = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const serialKey = GenerateSerialNumber("0000000000-0000000000");
    const tableId = 0;
    const total = req.body.price;
    const content = req.body.content;

    let contentString = "";
    const contentNames = content.map((c) => c.menu_menuName);
    const set = new Set(contentNames);

    for (let item of set) {
      const filtered = content.filter((c) => c.menu_menuName === item);

      const itemCount =
        filtered.length === 1
          ? filtered[0].count
          : filtered.reduce(function (cur, next) {
              return cur.count + next.count;
            });

      contentString = contentString
        .concat(item)
        .concat(`(${itemCount.toString()}) `);

      const [plusSale] = await conn.query(
        `update menu set sales=sales+${itemCount} where menuName='${item}'`
      );
      const [minusStock] = await conn.query(
        `update menu set remainStock=remainStock-${itemCount} where menuName='${item}'`
      );
    }

    const recordOrder = `insert into sales (serialKey, orderType, orderPrice, orderTime, cookTime, payTime, contentInOrder)
              values ('${serialKey}', ${tableId}, ${total}, (select receiveTime from customerorder where orderId=${orderId}),
              (select preparedTime from customerorder where orderId=${orderId}), (select preparedTime from customerorder where orderId=${orderId}),
              '${contentString}')`;
    let sql = `delete from ordercontent where order_orderId=${orderId}`;
    const sql2 = `delete from customerorder where orderId=${orderId}`;
    const sql3 = `insert into account values(date(now()),${total},0,0,0) on duplicate key update salesTotal=salesTotal+${total}`;

    const [rows] = await conn.query(recordOrder);
    const [rows2] = await conn.query(sql);
    const [rows3] = await conn.query(sql2);
    const [rows4] = await conn.query(sql3);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.send({ success: false });
  }
};

export const getTakeoutOrderInfo = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const sql = `select menu_menuName, count, price from orderContent where order_orderId=${orderId}`;
    const [rows] = await conn.query(sql);

    return res.status(200).json({ content: rows });
  } catch (err) {
    console.log(err, ".");
    return res.send(err);
  }
};

export const getTakeOutOrders = async (req, res) => {
  try {
    let sql = `select * from customerorder where sicktak_sicktakId=0`;

    const [rows] = await con.query(sql);
    return res.status(200).json({ success: true, takeOutOrders: rows });
  } catch (err) {
    console.log(err);
    return res.send({ success: false });
  }
};
