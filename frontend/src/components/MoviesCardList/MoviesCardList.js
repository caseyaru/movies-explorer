import './MoviesCardList.css';

import { useState, useEffect } from 'react';
import {
  MAX_WIDTH, MID_WIDTH, MIN_WIDTH, MAX_MOVIES, MID_MOVIES, MIN_MOVIES, MAX_STEP, MIN_STEP,
} from '../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  isSavedMovies, movies, onSave, onDelete, isLoading, message, submessage, savedMovies,
}) {
  const display = window.innerWidth;
  // изначально отображаемые фильмы
  const [shownMovies, setShownMovies] = useState(0);

  const counterMovies = () => {
    if (display > MAX_WIDTH) {
      setShownMovies(MAX_MOVIES);
    } else if (display >= MIN_WIDTH) {
      setShownMovies(MID_MOVIES);
    } else if (display < MIN_WIDTH) {
      setShownMovies(MIN_MOVIES);
    }
  };

  useEffect(() => {
    counterMovies();
  }, []);

  const handleShowMore = () => {
    if (display > MAX_WIDTH) {
      setShownMovies(shownMovies + MAX_STEP);
    } else if (display > MID_WIDTH) {
      setShownMovies(shownMovies + MIN_STEP);
    } else if (display < MID_WIDTH) {
      setShownMovies(shownMovies + MIN_STEP);
    }
  };

  return (
    <section className="cards">
      {isLoading
        ? (<div className="movies__notfound-container">
            <Preloader/>
          </div>)
        : (
          movies?.length !== 0
            ? (<>
                <div className="cards__list">
                  {movies.slice(0, shownMovies).map((movie) => (
                    <MoviesCard
                      key={isSavedMovies ? movie._id : movie.id}
                      movie={movie}
                      isSavedMovies={isSavedMovies}
                      onSave={onSave}
                      onDelete={onDelete}
                      savedMovies={savedMovies}
                    />
                  ))}
                </div>
                {movies.length > shownMovies
                  ? <div className="cards__btn-container">
                    <button type="button" className="cards__btn-more" onClick={handleShowMore}>Ещё</button>
                    </div>
                  : ''
                }
                {movies.length < 4
                  ? <div className="cards__space"></div>
                  : ''
                }
              </>)
            : (<div className="movies__notfound-container">
                <p className="movies__notfound-title">{message}</p>
                <p className="movies__notfound-subtitle">{submessage}</p>
              </div>)
        )
      }
    </section>
  );
}

export default MoviesCardList;
