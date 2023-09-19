const { celebrate, Joi } = require('celebrate');

const regex = /^https?:\/\/.+\.[a-z]+/;

const celebrateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celebrateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const celebrateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
});

const celebrateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri({ scheme: ['http', 'https'] }).pattern(regex),
    trailerLink: Joi.string().required().uri({ scheme: ['http', 'https'] }).pattern(regex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().uri({ scheme: ['http', 'https'] }).pattern(regex),
    movieId: Joi.number().required(),
  }),
});

const celebrateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  celebrateSignUp,
  celebrateSignIn,
  celebrateUpdateUser,
  celebrateCreateMovie,
  celebrateMovieId,
};
