import './Movies.css';
import { useEffect, useState } from 'react';

import {
  SERVER_ERROR_MESSAGE, NOTFOUND_MESSAGE, NOTFOUND_SUBMESSAGE,
  FILTER_ERROR_MESSAGE, FILTER_ERROR_SUBMESSAGE,
} from '../../utils/constants';

import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import { filterDuration, filterAll } from '../../utils/filter';

import Container from '../Container/Container';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ savedMovies, setSavedMovies }) {
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // отфильтрованные карточки (которые будут показываться)
  const [movies, setMovies] = useState([]);

  // сообщение: если не найдено, если ошибка
  const [message, setMessage] = useState('');
  const [submessage, setSubMessage] = useState('');

  // фильтр фильмов по длительности, идёт от сёрчформ
  const handleFilterMovies = () => {
    setIsShortMovies(!isShortMovies);
    const lastSearchText = localStorage.getItem('movieSearch');
    filterAll(movies, lastSearchText, !isShortMovies, setMovies);
    localStorage.setItem('shorts', !isShortMovies);
  };

  // useEffect(() => {
  //   const lastSearchText = localStorage.getItem('movieSearch');
  //   if (isShortMovies) {
  //     filterAll(movies, lastSearchText, isShortMovies, setMovies);
  //   } else {
  //     filterAll(movies, lastSearchText, !isShortMovies, setMovies);
  //   }
  //   // filterAll(movies, lastSearchText, isShortMovies, setMovies);
  // }, [isShortMovies]);

  // сабмит формы, полный поиск по фильмам с отрисовкой
  const handleSearch = (search) => {
    setMovies([]);
    localStorage.setItem('movieSearch', search);
    localStorage.setItem('shorts', isShortMovies);
    setIsLoading(true);
    MoviesApi.getMovies()
      .then((films) => {
        if (films) {
          const items = filterAll(films, search, isShortMovies, setMovies);
          if (!items) {
            setMessage(NOTFOUND_MESSAGE);
            setSubMessage(NOTFOUND_SUBMESSAGE);
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
    if (localStorage.getItem('allMovies')) {
      const lastMovies = JSON.parse(localStorage.getItem('allMovies'));
      if (localStorage.getItem('shorts') === 'true') {
        setMovies(filterDuration(lastMovies));
      } else {
        setMovies(lastMovies);
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
