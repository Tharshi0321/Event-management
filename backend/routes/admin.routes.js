const express = require('express');
const { body, param, query } = require('express-validator');
const {
  createUserByAdmin,
  listUsers,
  updateUserByAdmin,
  changeUserRole,
  changeUserStatus,
  deleteUserByAdmin,
  uploadUserImageByAdmin,
  listAuditLogs,
  listAllFeedbacks,
  deleteFeedback,
} = require('../controllers/admin.controller');
const {
  softDeleteEventByAdmin,
  listRecycledEvents,
  restoreRecycledEvent,
  permanentlyDeleteEvent,
  getResourceAnalytics,
} = require('../controllers/adminEvent.controller');
const { validateRequest } = require('../middleware/validate.middleware');
const { uploadProfileImage: uploadMw } = require('../middleware/upload.middleware');

const router = express.Router();

router.post('/users', createUserByAdmin);

router.get(
  '/users',
  [
    query('role').optional().isString().trim(),
    query('status').optional().isString().trim(),
    query('department').optional().isString().trim(),
    query('q').optional().isString().trim(),
  ],
  validateRequest,
  listUsers,
);

router.patch(
  '/users/:id',
  [
    param('id').isMongoId().withMessage('Invalid user id'),
    body('name').optional().isString().trim().notEmpty(),
    body('role').optional().isString().trim(),
    body('status').optional().isIn(['active', 'inactive', 'suspended']),
    body('phone').optional().isString(),
    body('department').optional().isString(),
    body('registrationNumber').optional().isString(),
    body('staffId').optional().isString(),
    body('bio').optional().isString().isLength({ max: 500 }),
    body('address').optional().isObject(),
    body('address.line1').optional().isString(),
    body('address.city').optional().isString(),
    body('address.district').optional().isString(),
    body('emailVerified').optional().isBoolean(),
    body('password').optional().isString().isLength({ min: 6 }),
    body('roleProfile').optional().isObject(),
  ],
  validateRequest,
  updateUserByAdmin,
);

router.patch(
  '/users/:id/role',
  [
    param('id').isMongoId().withMessage('Invalid user id'),
    body('role').isString().trim().notEmpty(),
  ],
  validateRequest,
  changeUserRole,
);

router.patch(
  '/users/:id/status',
  [
    param('id').isMongoId().withMessage('Invalid user id'),
    body('status').isIn(['active', 'inactive', 'suspended']),
  ],
  validateRequest,
  changeUserStatus,
);

router.delete(
  '/users/:id',
  [param('id').isMongoId().withMessage('Invalid user id')],
  validateRequest,
  deleteUserByAdmin,
);

router.delete(
  '/events/:id',
  [param('id').isMongoId().withMessage('Invalid event id')],
  validateRequest,
  softDeleteEventByAdmin,
);

router.get('/recycle-bin/events', listRecycledEvents);

router.post(
  '/recycle-bin/events/:id/restore',
  [param('id').isMongoId().withMessage('Invalid event id')],
  validateRequest,
  restoreRecycledEvent,
);

router.delete(
  '/recycle-bin/events/:id',
  [param('id').isMongoId().withMessage('Invalid event id')],
  validateRequest,
  permanentlyDeleteEvent,
);

router.get('/events/resource-analytics', getResourceAnalytics);

router.post(
  '/users/:id/image',
  [
    param('id').isMongoId().withMessage('Invalid user id'),
    validateRequest,
  ],
  (req, res, next) => {
    uploadMw.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message || 'Invalid file upload' });
      }
      return next();
    });
  },
  uploadUserImageByAdmin,
);

router.get(
  '/audit-logs',
  [query('limit').optional().isInt({ min: 1, max: 500 })],
  validateRequest,
  listAuditLogs,
);

router.get('/feedbacks', listAllFeedbacks);
router.delete('/feedbacks/:id', deleteFeedback);

module.exports = router;

// Fake commit on Thu Apr 09 00:38:19 2026 

// Fake commit on Sat Apr 25 03:18:45 2026 

// Fake commit on Wed Mar 25 15:28:32 2026 

// Fake commit on Thu Mar 26 17:04:22 2026 

// Fake commit on Thu Mar 12 01:52:04 2026 

// Fake commit on Fri Mar 27 04:48:39 2026 

// Fake commit on Thu Mar 26 06:09:47 2026 

// Fake commit on Wed Apr 22 19:01:34 2026 

// Fake commit on Wed Apr 22 07:54:39 2026 

// Fake commit on Fri Apr 24 00:27:25 2026 

// Fake commit on Sat Mar 28 21:23:12 2026 

// Fake commit on Sun Apr 05 18:47:19 2026 

// Fake commit on Fri Apr 03 18:50:51 2026 

// Fake commit on Mon Mar 16 23:03:14 2026 

// Fake commit on Fri Mar 13 09:51:43 2026 

// Fake commit on Wed Apr 08 07:41:52 2026 

// Fake commit #2 on 4/17/2026 2:29:18 AM

// Fake commit #23 on 3/2/2026 10:43:58 PM

// Fake commit #45 on 3/5/2026 10:17:20 PM

// Fake commit #70 on 3/4/2026 4:21:15 PM

// Fake commit #72 on 4/25/2026 3:20:49 PM

// Fake commit #78 on 4/23/2026 9:25:19 PM

// Fake commit #92 on 3/4/2026 9:15:58 AM
