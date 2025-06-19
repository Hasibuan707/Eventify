const db = require("../db");

exports.getAllEvents = async (req, res) => {
  try {
    let { search = "", category, location, page = 1 } = req.query;
    const limit = 5;
    const offset = (page - 1) * limit;

    search = search.replace(/[^À-ɏ\w\s]/gi, "");

    let baseQuery = `SELECT * FROM events WHERE 1=1`;
    const values = [];

    if (search) {
      values.push(`%${search.toLowerCase()}%`);
      baseQuery += ` AND LOWER(title) LIKE $${values.length}`;
    }

    if (category) {
      values.push(category);
      baseQuery += ` AND category = $${values.length}`;
    }

    if (location) {
      values.push(location);
      baseQuery += ` AND location = $${values.length}`;
    }

    values.push(limit);
    baseQuery += ` LIMIT $${values.length}`;
    values.push(offset);
    baseQuery += ` OFFSET $${values.length}`;

    console.log("DEBUG SQL:", baseQuery);
    console.log("VALUES:", values);

    const result = await db.query(baseQuery, values);
    res.json(result.rows);
  } catch (err) {
    console.error("\u274C Error in getAllEvents:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM events WHERE id = $1`, [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("\u274C Error in getEventById:", err);
    res.status(500).json({ error: err.message });
  }
};
