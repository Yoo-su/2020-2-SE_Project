import conn from "./database";

export const getAllOrders = async (req, res) => {
  try {
    const sql = `select * from customerorder where state='cooking' order by receiveTime asc`;
    const [rows] = await conn.query(sql);

    return res.status(200).json({
      success: true,
      order: rows,
    });
  } catch (err) {
    res.send({ success: false });
  }
};
