import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
        <section className="notfound">
            <div className="notfound__block">
                <h1 className="notfound__title">404</h1>
                <p className="notfound__text">Страница не найдена</p>
            </div>
            <button type="button" className="notfound__button" onClick={() => navigate(-1)}>Назад</button>
        </section>
  );
}

export default NotFoundPage;
