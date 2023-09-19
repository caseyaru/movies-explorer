/* eslint-disable function-paren-newline */
import './SavedMovies.css';
import { useState, useEffect } from 'react';

import {
  SERVER_ERROR_MESSAGE, NOTFOUND_MESSAGE, NOTFOUND_SUBMESSAGE,
} from '../../utils/constants';

import MainApi from '../../utils/MainApi';

import { filterDuration, filterName } from '../../utils/filter';

import Container from '../Container/Container';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ savedMovies, setSavedMovies }) {
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // сообщение: если не найдено, если ошибка
  const [message, setMessage] = useState('');
  const [submessage, setSubMessage] = useState('');

  // сохранённые фильмы для финальной отрисовки
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  // стейт для значения серчформ
  const [searchText, setSearchText] = useState('');

  // фильтр фильмов по длительности
  const handleFilterMovies = () => {
    setIsShortMovies(!isShortMovies);
  };

  // только меняем стейт для юзэффекта дальше
  const handleSearch = (search) => {
    setSearchText(search);
  };

  useEffect(() => {
    if (savedMovies.length !== 0) {
      const moviesForRender = filterName(savedMovies, searchText);
      if (isShortMovies) {
        setFilteredSavedMovies(filterDuration(moviesForRender));
      } else {
        setFilteredSavedMovies(moviesForRender);
      }
      if (filterDuration(moviesForRender).length === 0 || moviesForRender.length === 0) {
        setMessage(NOTFOUND_MESSAGE);
        setSubMessage(NOTFOUND_SUBMESSAGE);
      }
    } else {
      setSavedMovies([]);
    }
  }, [savedMovies, isShortMovies, searchText]);

  const handleDeleteMovie = (movie) => {
    MainApi.deleteMovie(movie._id)
      .then(() => {
        // фильтруем стейт, чтобы удалить из него выбранный фильм
        setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
        // из стейта с отрисовкой тоже
        setFilteredSavedMovies((state) => state.filter((m) => m._id !== movie._id));
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
                        isSavedMovies={true}
                        movies={filteredSavedMovies}
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

export default SavedMovies;
