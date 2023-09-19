// ссылка для постеров MoviesCard
export const BASE_URL = 'https://api.nomoreparties.co';

// ссылки для MainApi
export const LOCALHOST_URL = 'http://localhost:5000';
export const MAINAPI_URL = 'https://api.moviesexlorer.nomoreparties.co';

// eslint-disable-next-line no-useless-escape
export const EMAIL_REGEX = /^[a-zA-Z0-9+\._\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$/;

// длительность для filter
export const MIN = 40;
// длительность для getDuration
export const DURATION_PART = 60;

// размеры дисплея для CardList
export const MAX_WIDTH = 1180;
export const MID_WIDTH = 800;
export const MIN_WIDTH = 768;
// количество отображаемых фильмов
export const MAX_MOVIES = 12;
export const MID_MOVIES = 8;
export const MIN_MOVIES = 5;
// шаги
export const MAX_STEP = 3;
export const MIN_STEP = 2;

// сообщения об ошибках
export const ERROR_MESSAGE = 'Произошла ошибка:';
export const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка.';
export const AUTHORIZE_ERROR_MESSAGE = 'При авторизации произошла ошибка.';
export const NOTOKEN_ERROR_MESSAGE = 'Токен не передан или передан не в том формате.';
export const INVALID_TOKEN_ERROR_MESSAGE = 'Переданный токен некорректен.';
export const INVALID_DATA_ERROR_MESSAGE = 'Вы ввели неправильный логин или пароль.';
export const REGISTER_ERROR_MESSAGE = 'При регистрации пользователя произошла ошибка.';
export const REGISTER_DUPLICATE_ERROR_MESSAGE = 'Пользователь с таким email уже существует.';
export const UPDATE_PROFILE_ERROR_MESSAGE = 'При обновлении профиля произошла ошибка.';

// сообщения для поиска фильмов
export const NOTFOUND_MESSAGE = 'По данному запросу ничего не найдено.';
export const NOTFOUND_SUBMESSAGE = 'Попробуем другие ключевые слова?';
export const FILTER_ERROR_MESSAGE = 'Во время запроса произошла ошибка.';
export const FILTER_ERROR_SUBMESSAGE = 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';
