import jwt from 'jsonwebtoken';
import { createError } from '../../error.js';
import {isTokenInclued,getAccessTokenFromHeader} from "../../helpers/token/tokenHelpers.js";
const getAccessToRoute = (req, res, next) => {
 
  if (!isTokenInclued(req)) {
    next(createError(401,"token not included"))
  }
  const { JWT_SECRET_KEY } = process.env;
  const accessToken = getAccessTokenFromHeader(req);
  jwt.verify(accessToken, JWT_SECRET_KEY, (error, user) => {
    if (error) {
        next(createError(401,"token is not invalid"))
    }
    req.user = user;
    next();
  });
};

export default getAccessToRoute;
