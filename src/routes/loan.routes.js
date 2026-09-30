const express = require('express');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

router.get(
  '/',
  authenticate,
  (req, res) => {

    res.json({
      message: 'You can access loans',
      userId: req.user.id
    });

  }
);

module.exports = router;