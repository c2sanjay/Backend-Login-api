const { loginSchema } = require('../validators/auth.validator');
const authService = require('../services/auth.service');

async function login(req, res, next) {

  try {

    const data = loginSchema.parse(req.body);

    const result = await authService.loginUser(
      data.email,
      data.password
    );

    res.status(200).json({
      message: 'Login successful',
      ...result
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  login
};