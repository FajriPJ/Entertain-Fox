const router = require('express').Router();

const TvSeriesController = require('../controllers/tvseriesController');


router.get('/tvseries', TvSeriesController.read)
router.post('/tvseries', TvSeriesController.create)
router.get('/tvseries/:id', TvSeriesController.readOne)
router.put('/tvseries/:id', TvSeriesController.update)
router.delete('/tvseries/:id', TvSeriesController.delete)

module.exports = router
