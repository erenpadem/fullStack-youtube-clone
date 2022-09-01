export const sendJwtToClient = (user, res) => {
  const access_token = user.generateJwtFromUser();
  const { JWT_COOKIE } = process.env;

  return res
    .status(200)
    .cookie("access_token", access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
    })
    .json({
      success: true,
      access_token: access_token,
      data: {
        name:user.name,
        email:user.email,
        id:user._id,
        subscribedUsers:user.subscribedUsers,
        subscribers:user.subscribersi,
        img:user.img || null
      },
    });
   
};

export const isTokenInclued = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
  );
};
export const getAccessTokenFromHeader = (req) => {
  const Authorization = req.headers.authorization;
  const access_token = Authorization.split(" ")[1];
  return access_token;
};
