const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/user.repository");
const config = require("../config/env");

function invalidCredentialsError() {
  const error = new Error("Invalid email or password");
  error.statusCode = 401;
  return error;
}

async function loginUser(email, password) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw invalidCredentialsError();
  }

  if (!user.is_active) {
    throw invalidCredentialsError();
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    throw invalidCredentialsError();
  }

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpiresIn,
    },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken: token,
  };
}

module.exports = {
  loginUser,
};
