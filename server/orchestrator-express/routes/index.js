const router = require('express').Router();
const OrchesController = require('../controllers/orchesController');
const MoviesController = require('../controllers/moviesController');
const TvSeriesController = require('../controllers/seriesController');



router.get('/entertainme', OrchesController.readAll)

router.get('/movies', MoviesController.readAll )
router.post('/movies', MoviesController.create )
router.get('/movies/:id', MoviesController.readOne )
router.put('/movies/:id', MoviesController.update )
router.delete('/movies/:id', MoviesController.delete )

router.get('/tvseries', TvSeriesController.readAll )
router.get('/tvseries', TvSeriesController.create )
router.get('/tvseries/:id', TvSeriesController.readOne )
router.get('/tvseries/:id', TvSeriesController.update )
router.get('/tvseries/:id', TvSeriesController.delete )

module.exports = router