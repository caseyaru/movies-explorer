import './Login.css';
import { useEffect } from 'react';
import { EMAIL_REGEX } from '../../utils/constants';
import Form from '../Form/Form';
import useForm from '../../hooks/useForm';

function Login({
  onLogin, error, setError, isLoading,
}) {
  const {
    values, handleChange, setValues, errors, setErrors, isValid, isValidInput,
  } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      onLogin({
        email: values.email,
        password: values.password,
      });
    }
  };

  // очистка формы перед открытием
  useEffect(() => {
    setValues({
      email: '',
      password: '',
    });
    setErrors({});
  }, [setValues, setErrors]);

  useEffect(() => setError(''), []);

  return (
        <Form
            title="Рады видеть!"
            buttonText="Войти"
            isValid={isValid}
            text="Ещё не зарегистрированы?"
            linkUrl="/signup"
            linkText="Регистрация"
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
        >
            <label htmlFor="email" className="form__label">E-mail
                <input type="email" pattern="^[a-zA-Z0-9+\._\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$" className={`form__input ${isValidInput ? '' : 'form__input_type_error'}`} id="email" name="email" required={true} autoComplete="off" value={values.email} onChange={handleChange}/>
                <span id="error" className={`form__error ${isValidInput ? '' : 'form__error_visible'}`}>{errors.email}</span>
            </label>
            <label htmlFor="password" className="form__label">Пароль
                <input type="password" pattern="^[a-zA-Z0-9]+$" className={`form__input ${isValidInput ? '' : 'form__input_error'}`} id="password" name="password" required={true} autoComplete="off" value={values.password} onChange={handleChange}/>
                <span id="error" className={`form__error ${isValidInput ? '' : 'form__error_visible'}`}>{errors.password}</span>
            </label>
        </Form>
  );
}

export default Login;
