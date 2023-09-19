import './Movies.css';
import { useEffect, useState } from 'react';

import {
  SERVER_ERROR_MESSAGE, NOTFOUND_MESSAGE, NOTFOUND_SUBMESSAGE,
  FILTER_ERROR_MESSAGE, FILTER_ERROR_SUBMESSAGE,
} from '../../utils/constants';

import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import { filterDuration, filterName } from '../../utils/filter';

import Container from '../Container/Container';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ savedMovies, setSavedMovies }) {
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // неотфильтрованные по чекбоксу фильмы
  const [allMovies, setAllMovies] = useState([]);
  // отфильтрованные карточки (которые будут показываться)
  const [movies, setMovies] = useState([]);
  // уже полученные фильмы я.сервиса
  const initialMovies = JSON.parse(localStorage.getItem('allMovies')) ?? [];

  // сообщение: если не найдено, если ошибка
  const [message, setMessage] = useState('');
  const [submessage, setSubMessage] = useState('');
  const showMessages = () => {
    setMessage(NOTFOUND_MESSAGE);
    setSubMessage(NOTFOUND_SUBMESSAGE);
  };

  // фильтр фильмов по длительности, идёт от сёрчформ
  const handleFilterMovies = () => {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      setMovies(filterDuration(allMovies));
    } else {
      setMovies(allMovies);
    }
    if (filterDuration(allMovies).length === 0 || allMovies.length === 0) {
      showMessages();
    }
    localStorage.setItem('shorts', !isShortMovies);
  };

  const filterAllMovies = (items, search, isShort) => {
    const filteredMovies = filterName(items, search);
    setAllMovies(filteredMovies);
    if (isShort) {
      setMovies(filterDuration(filteredMovies));
    } else {
      setMovies(filteredMovies);
    }
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
  };

  // сабмит формы, полный поиск по фильмам с отрисовкой
  const handleSearch = (search) => {
    setMovies([]);
    localStorage.setItem('movieSearch', search);
    localStorage.setItem('shorts', isShortMovies);

    if (!initialMovies.length) {
      console.log('фильмов ещё нет');
      setIsLoading(true);
      MoviesApi.getMovies()
        .then((films) => {
          if (films) {
            // чтобы не было повторной отрисовки
            localStorage.setItem('allMovies', JSON.stringify(films));
            // отрисовка фильтрованных
            const items = filterAllMovies(films, search, isShortMovies);
            if (!items) {
              showMessages();
            }
          } else {
            setMessage(FILTER_ERROR_MESSAGE);
            setSubMessage(FILTER_ERROR_SUBMESSAGE);
          }
        })
        .catch(() => {
          console.log(SERVER_ERROR_MESSAGE);
        })
        .finally(() => setIsLoading(false));
    } else {
      console.log('фильмы уже есть');
      const items = filterAllMovies(initialMovies, search, isShortMovies);
      if (!items) {
        showMessages();
      }
    }
  };

  useEffect(() => {
    // проверка чекбокса
    if (localStorage.getItem('shorts') === 'true') {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, [isShortMovies]);

  useEffect(() => {
  // проверка на фильмы
    if (localStorage.getItem('filteredMovies')) {
      const lastMovies = JSON.parse(localStorage.getItem('filteredMovies'));
      // для устранения бага с непрогрузкой
      setAllMovies(lastMovies);
      if (localStorage.getItem('shorts') === 'true') {
        setMovies(filterDuration(lastMovies));
      } else {
        setMovies(lastMovies);
      }
      if (lastMovies.length === 0 || movies.length === 0) {
        showMessages();
      }
    }
  }, []);

  const handleSaveMovie = (movie) => {
    MainApi.saveMovie(movie)
      .then((movieToSave) => {
        // сохраняем фильм в стейте
        setSavedMovies([movieToSave, ...savedMovies]);
      })
      .catch(() => {
        console.log(SERVER_ERROR_MESSAGE);
      });
  };

  const handleDeleteMovie = (movie) => {
    MainApi.deleteMovie(movie._id)
      .then(() => {
        // фильтруем стейт, чтобы удалить из него выбранный фильм
        setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
      })
      .catch(() => {
        console.log(SERVER_ERROR_MESSAGE);
      });
  };

  return (
        <>
            <Header loggedIn={true} />
            <Container
              name="movies"
              block="movies"
            >
                <SearchForm
                    onSearch={handleSearch}
                    onFilter={handleFilterMovies}
                    isShortMovies={isShortMovies}
                />
                <MoviesCardList
                        isSavedMovies={false}
                        movies={movies}
                        onSave={handleSaveMovie}
                        onDelete={handleDeleteMovie}
                        isLoading={isLoading}
                        message={message}
                        submessage={submessage}
                        savedMovies={savedMovies}
                      />
            </Container>
            <Footer/>
        </>
  );
}

export default Movies;
