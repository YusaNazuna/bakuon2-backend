import { RDSService } from '../rds/rds.service';
import { DecodeToken } from '../token/decode-token.service';

const RDS = new RDSService();

/**
 * 相関チェック
 * : 型が異なるので一旦個別のコントローラーで相関チェック
 * : 予期せぬエラーは一旦ここで吐き出す
 * : 返り値が複数の場合は一旦エラーとする
 * @param request
 * @return {*} {
 *  isValid | true: Error
 * }
 */
export const doCorrelationCheck = async request => {
  const decodeToken = DecodeToken(request);

  if (decodeToken.isValid) {
    return { isValid: true, data: 'token error' };
  }

  const userInfo = decodeToken.data;
  const query = `
SELECT
  user_id
FROM
  accounts
WHERE 1
  and id = ${Number(userInfo['sub'])}
  and access_token = '${userInfo['accessToken']}'
`;
  await RDS.connect();
  const res = await RDS.execute(query);
  await RDS.disconnect();
  return res;
};
