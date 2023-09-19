import { MIN } from './constants';

// критерий длительности
export const filterDuration = (items) => items.filter((item) => item.duration <= MIN);

// поиск по названию
export const filterName = (items, search) => {
  // берём и возвращаем массив с отфильтрованными по запросу фильмами
  const filteredMovies = items.filter((movie) => {
    // название приводим к общему виду (регистр, отсекаем пробелы)
    const movieNameRU = String(movie.nameRU).toLowerCase().trim();
    const movieNameEN = String(movie.nameEN).toLowerCase().trim();
    // текст в строке поиска тоже
    const searchText = search.toLowerCase().trim();
    return movieNameRU.indexOf(searchText) !== -1 || movieNameEN.indexOf(searchText) !== -1;
  });
  return filteredMovies;
};
