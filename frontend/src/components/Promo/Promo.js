import './Promo.css';

import Container from '../Container/Container';
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <section className="promo">
      <Container
      name="promo"
      title="Учебный проект студента факультета Веб-разработки."
      block="promo"
      >
        <NavTab/>
      </Container>
    </section>
  );
}

export default Promo;
