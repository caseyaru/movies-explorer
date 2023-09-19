import './AboutProject.css';

import Container from '../Container/Container';

function AboutProject() {
  return (
    <section className="about-project" id="aboutproject">
        <Container
        name="main"
        title="О проекте">
            <div className="about-project__text-table">
                <div className="about-project__table-cell">
                    <p className="about-project__main-text">Дипломный проект включал 5 этапов</p>
                    <p className="about-project__sub-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__table-cell">
                    <p className="about-project__main-text">На выполнение диплома ушло 5 недель</p>
                    <p className="about-project__sub-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__line-table">
                <div className="about-project__block about-project__block_type_green">
                    <div className="about-project__time about-project__time_type_green">1 неделя</div>
                    <p className="about-project__text">Back-end</p>
                </div>
                <div className="about-project__block about-project__block_type_gray">
                    <div className="about-project__time about-project__time_type_gray">4 недели</div>
                    <p className="about-project__text">Front-end</p>
                </div>
            </div>
        </Container>
    </section>
  );
}

export default AboutProject;
