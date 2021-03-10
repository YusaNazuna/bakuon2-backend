import cookie from 'cookie';
import jwt from 'jwt-simple';

/**
 * JWTのデコード
 * @param {Object} req
 * @return {
 *  name: String
 *  email: String
 *  picture: String
 *  sub: String
 *  accessToken: String
 *  iat: Number
 *  exp: Number
 * }
 */

export const DecodeToken = req => {
  const token = req.headers['Cookie'] && cookie.parse(req.headers['Cookie'])['next-auth.session-token'];
  const secret = process.env.SECRET;
  return { isValid: !token, data: jwt.decode(token, secret, true) };
};
