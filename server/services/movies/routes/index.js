const router = require('express').Router();
const MovieController = require('../controllers/movieController');

router.get('/movies', MovieController.read)
router.post('/movies', MovieController.create)
router.get('/movies/:id', MovieController.readOne)
router.put('/movies/:id', MovieController.update)
router.delete('/movies/:id', MovieController.delete)

module.exports = router;


 