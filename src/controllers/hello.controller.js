import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'bakuon2-dev.chdaoiky9wfg.ap-northeast-1.rds.amazonaws.com',
  user: 'admin_tsuki',
  password: 'yusa9590',
  database: 'bakuon2_dev',
  port: '3318',
  connectionLimit: 5
});

export const HelloController = async (request, context) => {
  let conn;
  try {
    conn = await pool.getConnection();
    conn.beginTransaction();
    const rows = await conn.query('SELECT * from novels');
    conn.commit();
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.release();
    } else {
    }
  }
};
