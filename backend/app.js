require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT, DB } = require('./utils/config');

const app = express();

const limiter = require('./middlewares/limiter');

const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler } = require('./middlewares/errors');

mongoose.connect(DB)
  .then(() => console.log('Успешное подключение к базе данных'))
  .catch(() => console.log('Подключение к базе данных прервано'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.disable('x-powered-by');

const corsOptions = {
  origin: ['http://localhost:3001', 'https://localhost:3001', 'localhost:3001', 'https://moviesexlorer.nomoreparties.co'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(requestLogger);
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер жив (порт ${PORT})`);
});
