const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  changePassword,
  forgotPassword,
  forgotPasswordOtp,
  resetPasswordWithToken,
  resetPasswordWithOtp,
} = require('../controllers/auth.controller');
const {
  issueJwt,
  refreshAccessToken,
  logout,
  authenticate,
} = require('../middleware/auth.middleware');
const { validateRequest } = require('../middleware/validate.middleware');
const userController = require('../controllers/user.controller');
const { oauthStart, oauthCallback } = require('../controllers/oauth.controller');

const router = express.Router();

router.get('/oauth/:provider/start', oauthStart);
router.get('/oauth/:provider/callback', oauthCallback);
// Legacy aliases for Google OAuth routes (backward compatibility).
router.get('/google/start', (req, res) => {
  req.params.provider = 'google';
  return oauthStart(req, res);
});
router.get('/google/callback', (req, res) => {
  req.params.provider = 'google';
  return oauthCallback(req, res);
});

/** Current user (same payload shape as /api/users/profile). */
router.get('/me', authenticate, userController.getProfile);

router.post('/register', register, issueJwt);
router.post('/login', login, issueJwt);
router.post(
  '/forgot-password',
  body('email').isEmail(),
  validateRequest,
  forgotPassword,
);
/** Legacy OTP flow (prints OTP to server console in dev). */
router.post(
  '/forgot-password-otp',
  body('email').isEmail(),
  validateRequest,
  forgotPasswordOtp,
);
router.post(
  '/reset-password/:token',
  body('newPassword').isString().isLength({ min: 6 }),
  body('confirmPassword').isString(),
  validateRequest,
  resetPasswordWithToken,
);
router.post('/reset-password-otp', resetPasswordWithOtp);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);
router.put('/change-password', authenticate, changePassword);

module.exports = router;


// Fake commit on Sat Mar 28 20:10:38 2026 

// Fake commit on Thu Mar 26 02:50:43 2026 

// Fake commit on Wed Mar 18 09:11:25 2026 

// Fake commit on Fri Apr 03 19:29:22 2026 

// Fake commit on Sat Mar 07 08:46:36 2026 

// Fake commit on Sat Apr 04 02:34:04 2026 

// Fake commit on Tue Mar 03 05:09:02 2026 

// Fake commit on Fri Apr 17 02:05:27 2026 

// Fake commit #8 on 3/31/2026 11:59:31 AM

// Fake commit #19 on 4/24/2026 12:07:11 PM

// Fake commit #21 on 3/30/2026 10:02:37 PM

// Fake commit #80 on 3/28/2026 10:11:00 PM

// Fake commit #100 on 3/10/2026 10:56:01 PM
