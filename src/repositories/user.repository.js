const pool = require('../db/pool');

async function findByEmail(email) {

  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      password_hash,
      role,
      is_active
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
}

async function findById(id) {

  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      role,
      is_active
    FROM users
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

module.exports = {
  findByEmail,
  findById
};