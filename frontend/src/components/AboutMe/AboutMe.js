import './AboutMe.css';

import Container from '../Container/Container';
import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="aboutme">
      <Container
        name="main"
        title="Студент"
      >
        <div className="about-me__block">
            <div className="about-me__info">
                <p className="about-me__name">Ольга</p>
                <p className="about-me__about">Фронтенд-разработчик, 23 года</p>
                <p className="about-me__text">Я родилась в Мурманске, но поступила на биологический институт и переехала в Карелию. После окончания университета заинтересовалась веб-разработкой и прошла данный курс, чтобы приобрести навыки, необходимые во фронтенде.</p>
                <a href="https://github.com/caseyaru" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
            </div>
            <img className="about-me__photo" src={photo} alt="Фотография студента"/>
        </div>
      </Container>
    </section>
  );
}

export default AboutMe;
