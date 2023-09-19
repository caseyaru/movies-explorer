const router = require('express').Router();
const { errors } = require('celebrate');

const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { celebrateCreateMovie, celebrateMovieId } = require('../middlewares/validation');

router.post('/', celebrateCreateMovie, createMovie);
router.get('/', getMovies);
router.delete('/:movieId', celebrateMovieId, deleteMovie);

router.use(errors());

module.exports = router;
