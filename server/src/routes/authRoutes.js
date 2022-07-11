const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-tokens', authController.refreshTokens);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post(
  '/send-verification-email',
  auth(),
  authController.sendVerificationEmail
);
router.post('/verify-email', authController.verifyEmail);

module.exports = router;
