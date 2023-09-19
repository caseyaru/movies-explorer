import './App.css';
import { useState, useEffect } from 'react';
import {
  Route, Routes, useNavigate,
} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

import {
  SERVER_ERROR_MESSAGE, INVALID_DATA_ERROR_MESSAGE,
  REGISTER_ERROR_MESSAGE, UPDATE_PROFILE_ERROR_MESSAGE, REGISTER_DUPLICATE_ERROR_MESSAGE,
} from '../../utils/constants';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

import MainApi from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });

  // сохранённые карточки (раскидываем их в movies и saved-movies)
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // загрузка данных пользователя и сохранённых фильмов
  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(() => {
          console.log('На сервере произошла ошибка.');
        });
      MainApi.getMovies()
        .then((findMovies) => {
          setSavedMovies(findMovies);
        })
        .catch(() => {
          console.log('Произошла ошибка при отрисовке сохранённых фильмов');
        });
    }
  }, [loggedIn]);

  // проверяем данные при обновлении страницы
  useEffect(() => {
    MainApi.getUserInfo()
      .then((res) => {
        setLoggedIn(true);
      })
      .catch(() => console.log(SERVER_ERROR_MESSAGE));
  }, []);

  // авторизация
  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    MainApi
      .authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch(() => setError(INVALID_DATA_ERROR_MESSAGE))
      .finally(() => setIsLoading(false));
  };

  // регистрация
  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    MainApi.register(name, email, password)
      .then((res) => {
        if (res.status !== 409) {
          handleLogin({ email, password });
          setError('');
        } else {
          setError(REGISTER_DUPLICATE_ERROR_MESSAGE);
        }
      })
      .catch(() => {
        console.log(REGISTER_ERROR_MESSAGE);
        setError(REGISTER_ERROR_MESSAGE);
      })
      .finally(() => setIsLoading(false));
  };

  // выход из аккаунта
  const handleSignOut = () => {
    setIsLoading(true);
    MainApi
      .signout()
      .then(() => {
        setCurrentUser({});
        localStorage.clear();
        setLoggedIn(false);
        navigate('/', { replace: true });
      })
      .catch(() => console.log(SERVER_ERROR_MESSAGE))
      .finally(() => setIsLoading(false));
  };

  // обновление данных профиля
  const handleUpdateProfile = (data) => {
    setIsLoading(true);
    MainApi
      .putUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(() => {
        console.log(UPDATE_PROFILE_ERROR_MESSAGE);
        setError(UPDATE_PROFILE_ERROR_MESSAGE);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

      {isLoading
        ? <div className="page__container">
            <Preloader />
          </div>
        : (
            <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn}/>} />
          {!loggedIn
            ? (<>
              <Route path="/signup" element={<Register onRegister={handleRegister} isLoading={isLoading} error={error} setError={setError}/>} />
              <Route path="/signin" element={<Login onLogin={handleLogin} isLoading={isLoading} error={error} setError={setError}/>} />
              </>)
            : null}
          <Route path="/movies" element={<ProtectedRoute loggedIn={loggedIn} element={Movies} savedMovies={savedMovies} setSavedMovies={setSavedMovies}/>}/>
          <Route path="/saved-movies" element={<ProtectedRoute loggedIn={loggedIn} element={SavedMovies} savedMovies={savedMovies} setSavedMovies={setSavedMovies}/>}/>
          <Route path="/profile" element={<ProtectedRoute element={Profile} loggedIn={loggedIn} onUpdateProfile={handleUpdateProfile} onSignOut={handleSignOut} isLoading={isLoading} error={error}/>}/>
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        )}

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
