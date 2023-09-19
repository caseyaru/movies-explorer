export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка ${res.status}`);
  }

  // получение карточек
  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
    })
      .then((res) => this._response(res));
  }
}

const MoviesApi = new Api({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default MoviesApi;
