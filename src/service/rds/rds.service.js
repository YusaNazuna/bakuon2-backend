import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PW,
  database: process.env.RDS_DB,
  port: process.env.RDS_PORT,
  connectionLimit: process.env.RDS_CONN_LIMMIT
});

export class RDSService {
  constructor() {
    this.con = null;
  }

  async connect() {
    this.con = await pool.getConnection();
  }

  disconnect() {
    this.con.release();
  }

  async execute(sqlStatement) {
    if (!this.con) {
      return false;
    }

    try {
      return await this.con.query(sqlStatement);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
