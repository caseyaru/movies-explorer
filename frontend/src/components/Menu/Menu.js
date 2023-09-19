import './Menu.css';
import { NavLink } from 'react-router-dom';
import closeicon from '../../images/closeicon.svg';

function Menu({ isOpen, onClose }) {
  return (
    <div className={`menu__overlay ${isOpen ? 'menu__overlay_active' : ''}`}>
        <div className="menu">
            <div className="menu__navbar">
                <ul className="menu__main-links">
                    <li><NavLink to="/" className={({ isActive }) => (isActive ? 'menu__link menu__link_active' : 'menu__link')} >Главная</NavLink></li>
                    <li><NavLink to="/movies" className={({ isActive }) => (isActive ? 'menu__link menu__link_active' : 'menu__link')} >Фильмы</NavLink></li>
                    <li><NavLink to="/saved-movies" className={ ({ isActive }) => (isActive ? 'menu__link menu__link_active' : 'menu__link') } >Сохранённые фильмы</NavLink></li>
                </ul>
            </div>
            <NavLink to="/profile" className="menu_link-profile">Аккаунт</NavLink>
            <button type="button" className="menu__close" onClick={onClose} ><img src={closeicon} alt="Кнопка закрытия бокового меню" /></button>
        </div>
    </div>
  );
}

export default Menu;
