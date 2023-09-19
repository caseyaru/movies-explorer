import './Header.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import burgericon from '../../images/burgericon.svg';
import Menu from '../Menu/Menu';

function Header({ loggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
        <Link to="/" className="header__logo"></Link>
        {loggedIn
          ? <>
                <ul className="header__main-links">
                    <li><NavLink to="/movies" className={({ isActive }) => (isActive ? 'header__link header__link_active' : 'header__link')} >Фильмы</NavLink></li>
                    <li><NavLink to="/saved-movies" className={({ isActive }) => (isActive ? 'header__link header__link_active' : 'header__link')} >Сохранённые фильмы</NavLink></li>
                </ul>
                    <NavLink to="/profile" className="header__link-profile">Аккаунт</NavLink>
                <button type="button" className="header__icon" onClick={handleMenuOpen} ><img src={burgericon} alt="Иконка меню" /></button>
            </>
          : <div className="header__sign-links">
                <NavLink to="/signup" className="header__link-signup">Регистрация</NavLink>
                <NavLink to="/signin" className="header__link-signin">Войти</NavLink>
            </div>
        }
        <Menu isOpen={isMenuOpen} onClose={handleMenuOpen} />
    </header>
  );
}

export default Header;
