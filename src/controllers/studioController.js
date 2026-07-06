const pool = require('../db/pool');

async function getStudios(req, res, next) {
  try {
    const result = await pool.query(
      'SELECT id, name, country, founded_year, created_at FROM studios ORDER BY id ASC'
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    return next(error);
  }
}

async function getStudioById(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT id, name, country, founded_year, created_at FROM studios WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Studio not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
}

async function createStudio(req, res, next) {
  try {
    const { name, country, founded_year } = req.body;

    const result = await pool.query(
      `
      INSERT INTO studios (name, country, founded_year)
      VALUES ($1, $2, $3)
      RETURNING id, name, country, founded_year, created_at
      `,
      [name, country, founded_year]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
}

async function updateStudio(req, res, next) {
  try {
    const { id } = req.params;
    const { name, country, founded_year } = req.body;

    const result = await pool.query(
      `
      UPDATE studios
      SET name = $1, country = $2, founded_year = $3
      WHERE id = $4
      RETURNING id, name, country, founded_year, created_at
      `,
      [name, country, founded_year, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Studio not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
}

async function deleteStudio(req, res, next) {
  try {
    const { id } = req.params;

    const studio = await pool.query('SELECT id FROM studios WHERE id = $1', [id]);

    if (studio.rows.length === 0) {
      return res.status(404).json({ message: 'Studio not found' });
    }

    const games = await pool.query('SELECT id FROM games WHERE studio_id = $1 LIMIT 1', [id]);

    if (games.rows.length > 0) {
      return res
        .status(409)
        .json({ message: 'Cannot delete studio with associated games' });
    }

    await pool.query('DELETE FROM studios WHERE id = $1', [id]);
    return res.status(200).json({ message: 'Studio deleted' });
  } catch (error) {
    return next(error);
  }
}

async function getStudioGames(req, res, next) {
  try {
    const { id } = req.params;

    const studioResult = await pool.query(
      'SELECT id, name, country, founded_year, created_at FROM studios WHERE id = $1',
      [id]
    );

    if (studioResult.rows.length === 0) {
      return res.status(404).json({ message: 'Studio not found' });
    }

    const gamesResult = await pool.query(
      `
      SELECT id, title, genre, release_year, studio_id, created_at
      FROM games
      WHERE studio_id = $1
      ORDER BY id ASC
      `,
      [id]
    );

    return res.status(200).json({
      studio: studioResult.rows[0],
      games: gamesResult.rows
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getStudios,
  getStudioById,
  createStudio,
  updateStudio,
  deleteStudio,
  getStudioGames
};
