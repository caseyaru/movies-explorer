import './Register.css';
import { useEffect } from 'react';
import { EMAIL_REGEX } from '../../utils/constants';
import Form from '../Form/Form';
import useForm from '../../hooks/useForm';

function Register({
  onRegister, isLoading, error, setError,
}) {
  const {
    values, handleChange, setValues, errors, setErrors, isValid, isValidInput,
  } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      onRegister({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    }
  };

  // очистка формы перед открытием
  useEffect(() => {
    setValues({
      name: '',
      email: '',
      password: '',
    });
    setErrors({});
  }, [setValues, setErrors]);

  useEffect(() => setError(''), []);

  return (
        <Form
            title="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            isValid={isValid}
            text="Уже зарегистрированы?"
            linkUrl="/signin"
            linkText="Войти"
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
        >
            <label htmlFor="name" className="form__label">Имя
                <input type="text" pattern="^[а-яА-ЯёЁa-zA-Z0-9]+$" className={`form__input ${isValidInput ? '' : 'form__input_type_error'}`} id="name" name="name" required={true} autoComplete="off" value={values.name || ''} onChange={handleChange} disabled={isLoading}/>
                <span id="error" className={`form__error ${isValidInput ? '' : 'form__error_visible'}`}>{errors.name}</span>
            </label>
            <label htmlFor="email" className="form__label">E-mail
                <input type="email" pattern="^[a-zA-Z0-9+\._\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$" className={`form__input ${isValidInput ? '' : 'form__input_type_error'}`} id="email" name="email" required={true} autoComplete="off" value={values.email} onChange={handleChange} disabled={isLoading}/>
                <span id="error" className={`form__error ${isValidInput ? '' : 'form__error_visible'}`}>{errors.email}</span>
            </label>
            <label htmlFor="password" className="form__label">Пароль
                <input type="password" pattern="^[a-zA-Z0-9]+$" className={`form__input ${isValidInput ? '' : 'form__input_type_error'}`} id="password" name="password" required={true} autoComplete="off" value={values.password} onChange={handleChange} disabled={isLoading}/>
                <span id="error" className={`form__error ${isValidInput ? '' : 'form__error_visible'}`}>{errors.password}</span>
            </label>
        </Form>
  );
}

export default Register;
