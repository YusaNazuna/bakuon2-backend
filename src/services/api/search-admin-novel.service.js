import { RDSService } from '../rds/rds.service';

const RDS = new RDSService();

export const SearchAdminNovelService = async userId => {
  const query = `
  SELECT
    *
  FROM
    novels
  WHERE 1
    and created_by = ${userId}
    and is_deleted = 0
  `;
  await RDS.connect();
  const res = await RDS.execute(query);
  await RDS.disconnect();
  return res['data'];
};
