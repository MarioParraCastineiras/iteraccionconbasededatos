const pool = require('../db/pool');

async function getGames(req, res, next) {
  try {
    const result = await pool.query(
      `
      SELECT
        g.id,
        g.title,
        g.genre,
        g.release_year,
        g.studio_id,
        g.created_at,
        s.name AS studio_name
      FROM games g
      INNER JOIN studios s ON s.id = g.studio_id
      ORDER BY g.id ASC
      `
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    return next(error);
  }
}

async function getGameById(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        g.id,
        g.title,
        g.genre,
        g.release_year,
        g.studio_id,
        g.created_at,
        s.name AS studio_name
      FROM games g
      INNER JOIN studios s ON s.id = g.studio_id
      WHERE g.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
}

async function createGame(req, res, next) {
  try {
    const { title, genre, release_year, studio_id } = req.body;

    const studio = await pool.query('SELECT id FROM studios WHERE id = $1', [studio_id]);

    if (studio.rows.length === 0) {
      return res.status(400).json({ message: 'studio_id does not exist' });
    }

    const result = await pool.query(
      `
      INSERT INTO games (title, genre, release_year, studio_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, genre, release_year, studio_id, created_at
      `,
      [title, genre, release_year, studio_id]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
}

async function updateGame(req, res, next) {
  try {
    const { id } = req.params;
    const { title, genre, release_year, studio_id } = req.body;

    const studio = await pool.query('SELECT id FROM studios WHERE id = $1', [studio_id]);

    if (studio.rows.length === 0) {
      return res.status(400).json({ message: 'studio_id does not exist' });
    }

    const result = await pool.query(
      `
      UPDATE games
      SET title = $1, genre = $2, release_year = $3, studio_id = $4
      WHERE id = $5
      RETURNING id, title, genre, release_year, studio_id, created_at
      `,
      [title, genre, release_year, studio_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
}

async function deleteGame(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM games WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }

    return res.status(200).json({ message: 'Game deleted' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
};
