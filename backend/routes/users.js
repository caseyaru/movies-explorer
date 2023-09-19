const router = require('express').Router();
const { errors } = require('celebrate');

const { getMe, updateUser } = require('../controllers/users');
const { celebrateUpdateUser } = require('../middlewares/validation');

router.get('/me', getMe);
router.patch('/me', celebrateUpdateUser, updateUser);

router.use(errors());

module.exports = router;
