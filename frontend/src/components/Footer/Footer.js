import './Footer.css';

function Footer() {
  const date = new Date();

  return (
    <footer className="footer">
        <p className="footer__copyright">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__block">
          <p className="footer__date">&copy; {date.getFullYear()}</p>
          <div className="footer__links">
            <a href="https://practicum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            <a href="https://github.com/" className="footer__link" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
    </footer>
  );
}

export default Footer;
