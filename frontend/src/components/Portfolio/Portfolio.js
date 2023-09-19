import './Portfolio.css';

import Container from '../Container/Container';

function Portfolio() {
  return (
    <section className="portfolio">
        <Container
            name="main"
            title="Портфолио"
            block="portfolio"
        >
            <ul className="portfolio__links">
                <li>
                    <a className="portfolio__link" href="https://github.com/caseyaru/how-to-learn" target="_blank" rel="noreferrer">
                        <p className="portfolio__heading">Статичный сайт</p>
                        <button className="portfolio__btn"></button>
                    </a>
                </li>
                <li>
                    <a className="portfolio__link" href="https://github.com/caseyaru/how-to-learn" target="_blank" rel="noreferrer">
                        <p className="portfolio__heading">Адаптивный сайт</p>
                        <button className="portfolio__btn"></button>
                    </a>
                </li>
                <li>
                    <a className="portfolio__link" href="https://github.com/caseyaru/how-to-learn" target="_blank" rel="noreferrer">
                        <p className="portfolio__heading">Одностраничное приложение</p>
                        <button className="portfolio__btn"></button>
                    </a>
                </li>
            </ul>
        </Container>
    </section>
  );
}

export default Portfolio;
