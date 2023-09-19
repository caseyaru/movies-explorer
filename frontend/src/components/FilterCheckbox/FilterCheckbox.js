import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox({ onFilter, isShortMovies }) {
  // const [checked, setChecked] = useState(false);
  // const handleCheckbox = (evt) => {
  //   setChecked(evt.target.value);
  //   onFilter();
  // };

  return (
    <div className="search-form__filter">
      <input type="checkbox" className="search-form__checkbox" onChange={onFilter} checked={isShortMovies} id="filter-switch"/>
      <label htmlFor="filter-switch" className="search-form__filter-text">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
