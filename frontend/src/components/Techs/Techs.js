import './Techs.css';

import Container from '../Container/Container';

function Techs() {
  return (
    <section className="techs" id="techs">
      <Container
        name="main"
        title="Технологии"
      >
            <div className="techs__block">
                <p className="techs__block-title">7 технологий</p>
                <p className="techs__block-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__points">
                    <li className="techs__point">HTML</li>
                    <li className="techs__point">CSS</li>
                    <li className="techs__point">JS</li>
                    <li className="techs__point">React</li>
                    <li className="techs__point">Git</li>
                    <li className="techs__point">Express.js</li>
                    <li className="techs__point">mongoDB</li>
                </ul>
            </div>
      </Container>
    </section>
  );
}

export default Techs;
