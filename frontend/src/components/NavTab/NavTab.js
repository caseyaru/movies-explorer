import './NavTab.css';
import { Link } from 'react-scroll';

function NavTab() {
  return (
    <div className="navtab">
        <nav className="navtab__links">
            <Link to="aboutproject" className="navtab__link" smooth={true} duration={400}>О проекте</Link>
            <Link to="techs" className="navtab__link" smooth={true} duration={400}>Технологии</Link>
            <Link to="aboutme" className="navtab__link" smooth={true} duration={400}>Студент</Link>
        </nav>
    </div>
  );
}

export default NavTab;
