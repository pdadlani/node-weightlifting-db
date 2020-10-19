const jwt = require("jsonwebtoken");

module.exports = user => {
  const payload = {
    id: user.id,
    username: user.username
  };

  const secret = process.env.TOKEN_SECRET;

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
};
