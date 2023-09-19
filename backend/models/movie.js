const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  // страна
  country: {
    type: String,
    required: true,
  },
  // режиссёр
  director: {
    type: String,
    required: true,
  },
  // длительность
  duration: {
    type: Number,
    required: true,
  },
  // год
  year: {
    type: String,
    required: true,
  },
  // описание
  description: {
    type: String,
    required: true,
  },
  // ссылка на постер
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  // ссылка на трейлер
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  // миниатюрное изображение постера
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  // _id пользователя, сохранившего фильм
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // d фильма
  movieId: {
    type: Number,
    required: true,
  },
  // название на русском
  nameRU: {
    type: String,
    required: true,
  },
  // название на английском
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
