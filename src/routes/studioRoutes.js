const { Router } = require('express');

const {
  getStudios,
  getStudioById,
  createStudio,
  updateStudio,
  deleteStudio,
  getStudioGames
} = require('../controllers/studioController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { studioSchema } = require('../schemas/studioSchema');

const router = Router();

router.get('/', getStudios);
router.get('/:id', getStudioById);
router.get('/:id/games', getStudioGames);

router.post('/', auth, validate(studioSchema), createStudio);
router.put('/:id', auth, validate(studioSchema), updateStudio);
router.delete('/:id', auth, deleteStudio);

module.exports = router;
