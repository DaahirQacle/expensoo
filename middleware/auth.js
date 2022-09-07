import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("unauthorised user");
  }

  console.log(`auth headeeeeeeeeeeeeeeeeeeeeer ${authHeader}`);
  const token = authHeader.split(" ")[1];
  console.log(`tooooooooooooooooooooken ${token}`);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    console.log(error);
    throw new Error("unauthorised userrrr");
  }
};

export default auth;
