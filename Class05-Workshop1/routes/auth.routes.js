const router = require('express').Router();
const AuthController = require('../controllers/auth.cotroller');

router.post('/login', AuthController.loginUser);

module.exports = router;  