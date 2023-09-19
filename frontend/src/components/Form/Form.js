import './Form.css';
import { Link } from 'react-router-dom';

function Form({
  title, children, buttonText, text, linkUrl, linkText, isValid, onSubmit, isLoading, error,
}) {
  return (
            <section className="form__container">
                <Link to="/" className="form__logo"></Link>
                <h1 className="form__title">{title}</h1>
                <form className="form__form" onSubmit={onSubmit} noValidate disabled={!isValid}>
                    {children}
                    <span className="form__allerror">{error}</span>
                    <button type="submit"
                      disabled={!isValid || isLoading}
                      className="form__button"
                    >
                      {buttonText}
                    </button>
                    <div className="form__text-block">
                        <p className="form__text">{text}</p>
                        <Link to={linkUrl} className="form__link">{linkText}</Link>
                    </div>
                </form>
            </section>
  );
}

export default Form;
