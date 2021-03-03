import { RDSService } from '../service/rds/rds.service';

export const SearchNovelController = async (request, context) => {
  const RDS = new RDSService();
  const select = request.body.select || '*';
  const table = 'novels';
  const conditions = '';

  const query = `
    SELECT
      ${select}
    FROM
      ${table}
    WHERE 1 ${conditions}
  `;

  await RDS.connect();
  const res = await RDS.execute(query);
  await RDS.disconnect();
  return res;
};
