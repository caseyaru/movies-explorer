import './MoviesCard.css';
import { BASE_URL, DURATION_PART } from '../../utils/constants';

function MoviesCard({
  isSavedMovies, movie, onSave, onDelete, savedMovies,
}) {
  // проверка, совпадает ли айди фильма с айди из стейта с сохранёнными
  const isSaved = (array, element) => array.find((item) => item.movieId === element.id);

  // пересчёт duration
  const getDuration = (dur) => {
    const hours = Math.floor(dur / DURATION_PART);
    const minutes = dur % DURATION_PART;
    return `${hours ? `${hours}ч` : ''} ${minutes}м`.trim();
  };

  // добавление и удаление на вкладке фильмы
  const handleClick = () => {
    if (isSaved(savedMovies, movie)) {
      onDelete(savedMovies.filter((m) => m.movieId === movie.id)[0]);
    } else {
      onSave(movie);
    }
  };

  // удаление на вкладке сохранённых
  const onDeleteSave = () => {
    onDelete(movie);
  };

  return (
    <div className="card">
      <div className="card__promo">
        <a href={movie.trailerLink} className="card__link" target="_blank" rel="noreferrer"><img src={!isSavedMovies ? `${BASE_URL}${movie.image.url}` : movie.image} alt={`Постер фильма "${movie.nameRU}"`} className="card__image" /></a>
        {isSavedMovies
          ? <button type="button" className="card__btn card__btn_type_delete" onClick={onDeleteSave}></button>
          : <button type="button" className={`card__btn ${isSaved(savedMovies, movie) ? 'card__btn_type_saved' : 'card__btn_type_to-save'}`} onClick={handleClick}></button>
        }
      </div>
      <div className="card__info">
        <span className="card__name">{movie.nameRU}</span>
        <p className="card__duration">{getDuration(movie.duration)}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
