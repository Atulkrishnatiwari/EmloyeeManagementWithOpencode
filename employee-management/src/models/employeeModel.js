const pool = require("../config/db");

const EmployeeModel = {
  async getAll({ limit, offset, search }) {
    let query = "SELECT id, name, email, mobile, image FROM employees";
    const values = [];
    let index = 1;

    if (search) {
      values.push(`%${search}%`);
      query += ` WHERE name ILIKE $${index} OR email ILIKE $${index}`;
      index += 1;
    }

    query += " ORDER BY id DESC";

    if (typeof limit === "number") {
      values.push(limit);
      query += ` LIMIT $${index}`;
      index += 1;
    }

    if (typeof offset === "number") {
      values.push(offset);
      query += ` OFFSET $${index}`;
    }

    const result = await pool.query(query, values);
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query(
      "SELECT id, name, email, mobile, image FROM employees WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  },

  async create({ name, email, mobile, image }) {
    const result = await pool.query(
      "INSERT INTO employees (name, email, mobile, image) VALUES ($1, $2, $3, $4) RETURNING id, name, email, mobile, image",
      [name, email, mobile, image || null]
    );
    return result.rows[0];
  },

  async update(id, { name, email, mobile, image }) {
    const result = await pool.query(
      "UPDATE employees SET name = $1, email = $2, mobile = $3, image = $4 WHERE id = $5 RETURNING id, name, email, mobile, image",
      [name, email, mobile, image || null, id]
    );
    return result.rows[0] || null;
  },

  async deleteAll() {
    await pool.query("DELETE FROM employees");
  },

  async deleteById(id) {
    const result = await pool.query(
      "DELETE FROM employees WHERE id = $1 RETURNING id",
      [id]
    );
    return result.rows[0] || null;
  },
};

module.exports = EmployeeModel;
