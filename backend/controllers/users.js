const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { JWT } = require('../utils/config');

const { OK, CREATED, DB_DUPLICATE } = require('../utils/constants');
const NotFound = require('../errors/NotFound');
const NotAllData = require('../errors/NotAllData');
const UserError = require('../errors/UserError');

const createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      User.create({ ...req.body, password: hashedPassword })
        .then((user) => {
          res.status(CREATED).send({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
        })
        .catch((err) => {
          if (err.code === DB_DUPLICATE) {
            return next(new UserError('Данная почта уже используется'));
          }
          next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new NotAllData('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const token = jwt.sign({ _id: user.id }, JWT, { expiresIn: '7d' });
            res.cookie('jwt', token, {
              maxAge: 604800000,
              httpOnly: true,
            });
            res.status(OK).send({ _id: user._id, name: user.name, email: user.email });
          } else {
            next(new NotAllData('Неверный пароль'));
          }
        })
        .catch(next);
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Куки удалены' });
  res.end();
};

const getMe = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Данные не найдены'));
      }
      res.status(OK).send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => new NotAllData('Ошибка в данных'))
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch(next);
};

module.exports = {
  createUser, getMe, updateUser, login, signout,
};
