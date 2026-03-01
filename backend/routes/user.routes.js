const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validateRequest } = require('../middleware/validate.middleware');
const { uploadProfileImage: uploadMw } = require('../middleware/upload.middleware');

const router = express.Router();

router.get('/profile', authenticate, userController.getProfile);
router.get('/me', authenticate, userController.getProfile);

router.put(
  '/profile',
  authenticate,
  body('name').optional().isString().trim().notEmpty(),
  body('email').optional().isEmail(),
  body('phone').optional().isString().trim(),
  body('address').optional().isObject(),
  body('address.line1').optional().isString().trim(),
  body('address.city').optional().isString().trim(),
  body('address.district').optional().isString().trim(),
  body('department').optional().isString().trim(),
  body('registrationNumber').optional().isString().trim(),
  body('bio').optional().isString().isLength({ max: 500 }),
  body('roleProfile').optional().isObject(),
  validateRequest,
  userController.updateProfile,
);

router.put(
  '/me',
  authenticate,
  body('name').optional().isString().trim().notEmpty(),
  body('email').optional().isEmail(),
  body('phone').optional().isString().trim(),
  body('address').optional().isObject(),
  body('address.line1').optional().isString().trim(),
  body('address.city').optional().isString().trim(),
  body('address.district').optional().isString().trim(),
  body('department').optional().isString().trim(),
  body('registrationNumber').optional().isString().trim(),
  body('bio').optional().isString().isLength({ max: 500 }),
  body('roleProfile').optional().isObject(),
  validateRequest,
  userController.updateProfile,
);

router.put(
  '/upload-image',
  authenticate,
  (req, res, next) => {
    uploadMw.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message || 'Invalid file upload' });
      }
      return next();
    });
  },
  userController.uploadProfileImage,
);

module.exports = router;

// Fake commit on Mon Mar 23 07:27:00 2026 

// Fake commit on Thu Mar 05 15:38:18 2026 

// Fake commit on Sun Apr 19 02:31:40 2026 

// Fake commit on Tue Mar 24 03:47:35 2026 

// Fake commit on Wed Apr 22 05:38:42 2026 

// Fake commit #11 on 4/1/2026 11:04:23 AM

// Fake commit #22 on 4/3/2026 3:37:58 PM

// Fake commit #43 on 4/9/2026 7:58:08 PM

// Fake commit #55 on 3/10/2026 4:13:53 PM

// Fake commit #66 on 3/8/2026 6:27:52 AM

// Fake commit #93 on 4/18/2026 5:34:44 AM
