const Movie = require('../models/movie');

const { OK, CREATED } = require('../utils/constants');
const NotFound = require('../errors/NotFound');
const NotAllowed = require('../errors/NotAllowed');

const createMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => { res.status(CREATED).send(movie); })
    .catch(next);
};

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => { res.status(OK).send(movies); })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFound('Данные не найдены'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        movie.deleteOne(movie)
          .then((movies) => { res.status(OK).send(movies); })
          .catch(next);
      } else {
        return next(new NotAllowed('Недостаточно прав для удаления'));
      }
    })
    .catch(next);
};

module.exports = { createMovie, getMovies, deleteMovie };
