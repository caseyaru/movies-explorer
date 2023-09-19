import './Profile.css';
import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useForm from '../../hooks/useForm';
import Header from '../Header/Header';
import line from '../../images/line.svg';

function Profile({
  onUpdateProfile, loggedIn, onSignOut, isLoading, error,
}) {
  const currentUser = useContext(CurrentUserContext);

  // "режим редактирования" для изменения формы и кнопок
  const [isEditing, setIsEditing] = useState(false);

  const {
    values, handleChange, setValues, isValid, errors,
  } = useForm({
    name: '',
    email: '',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      onUpdateProfile({
        name: values.name,
        email: values.email,
      });
      setIsEditing(false);
    }
  };

  // актуальные данные при открытии
  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues]);

  return (
        <>
            <Header loggedIn={loggedIn} />
            <section className="profile">
                <div className="profile__container">
                    <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                    <form className="profile__form" isValid={isValid} onSubmit={handleSubmit} noValidate>
                        <fieldset className="profile__inputs">
                            <div className="profile__position">
                                <label className="profile__label">Имя</label>
                                {isEditing
                                  ? <input className="profile__input" name="name" type="text" required={true} value={values.name} onChange={handleChange} autoComplete="off"/>
                                  : <p className="profile__data">{currentUser.name}</p>
                                }
                            </div>
                            <img className="profile__line" src={line} alt="Граница между блоками"/>
                            <div className="profile__position">
                                <label className="profile__label">E-mail</label>
                                {isEditing
                                  ? <input className="profile__input" name="email" type="email" pattern="^[a-zA-Z0-9+\._\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$" required={true} value={values.email} onChange={handleChange} autoComplete="off"/>
                                  : <p className="profile__data">{currentUser.email}</p>
                                }
                            </div>
                        </fieldset>
                        <nav className="profile__navigation">
                            { isEditing
                              ? (<>
                                    <span className={`profile__error ${isValid ? '' : 'profile__error_visible'}`}>{errors.name || errors.email || error}</span>
                                    <button disabled={!isValid || isLoading} className={`profile__btn-save ${(!isValid && !isLoading) ? 'profile__btn-save_disabled' : ''}`} type="submit" onClick={handleSubmit}>Сохранить</button>
                                </>)
                              : (<>
                                    <button className="profile__btn profile__btn_type_edit" type="button" onClick={handleEdit}>Редактировать</button>
                                    <button disabled={isLoading} className="profile__btn profile__btn_type_signout" type="button" onClick={onSignOut}>Выйти из аккаунта</button>
                                </>)
                            }
                        </nav>
                    </form>
                </div>
            </section>
        </>
  );
}

export default Profile;
