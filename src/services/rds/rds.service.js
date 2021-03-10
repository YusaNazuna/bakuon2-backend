import mariadb from 'mariadb';

const connect = {
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PW,
  database: process.env.RDS_DB,
  port: process.env.RDS_PORT
};
export class RDSService {
  constructor() {
    this.con = null;
  }

  async connect() {
    this.con = await mariadb.createConnection(connect);
  }

  async disconnect() {
    if (this.con) {
      await this.con.end().catch(e => {
        console.error(`disconnect e:${e}`);
      });
    }
  }

  async execute(sqlStatement) {
    if (!this.con) {
      return { isValid: false, data: 'connect error' };
    }

    try {
      const res = await this.con.query(sqlStatement);
      return { isValid: false, data: res };
    } catch (err) {
      console.error(err);
      return {
        isValid: false,
        data: [err]
      };
    }
  }
}
