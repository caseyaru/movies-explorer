import './SearchForm.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onSearch, onFilter, isShortMovies }) {
  const [search, setSearch] = useState('');
  const location = useLocation();

  const handleChange = (evt) => {
    setSearch(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearch(search);
  };

  useEffect(() => {
    if (localStorage.getItem('movieSearch') && location.pathname === '/movies') {
      const lastSearchText = localStorage.getItem('movieSearch');
      setSearch(lastSearchText);
    }
  }, []);

  return (
        <section className="search-form">
            <div className="search-form__container">
                <form className="search-form__form" onSubmit={handleSubmit}>
                  <div className="search-form__field">
                    <input type="text" className="search-form__input" placeholder="Фильм" name="search" required={true} autoComplete="off" onChange={handleChange} value={search || ''}/>
                    <button type="submit" className="search-form__btn"></button>
                  </div>
                  <FilterCheckbox onFilter={onFilter} isShortMovies={isShortMovies}/>
                </form>
            </div>
        </section>
  );
}

export default SearchForm;
