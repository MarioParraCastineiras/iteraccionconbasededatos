const { Router } = require('express');

const {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
} = require('../controllers/gameController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { gameSchema } = require('../schemas/gameSchema');

const router = Router();

router.get('/', getGames);
router.get('/:id', getGameById);

router.post('/', auth, validate(gameSchema), createGame);
router.put('/:id', auth, validate(gameSchema), updateGame);
router.delete('/:id', auth, deleteGame);

module.exports = router;
