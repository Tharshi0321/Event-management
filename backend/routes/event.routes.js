const express = require('express');
const {
  createLifecycleEvent,
  listLifecycleEvents,
  getLifecycleEvent,
  updateLifecycleEvent,
  cancelLifecycleEvent,
  deleteLifecycleEvent,
  listMyEvents,
  listPendingEvents,
  listAllEventsForFaculty,
  listApprovedEvents,
  approveEvent,
  rejectEvent,
  checkInQr,
  getOrganizerOverview,
  registerForEvent,
  unregisterFromEvent,
  getStudentRegistrations,
} = require('../controllers/event.controller');
const {
  previewEventSimulation,
  getResourceInsights,
  getEventStoryPdf,
} = require('../controllers/adminEvent.controller');
const { uploadEventImages } = require('../middleware/upload.middleware');
const {
  getStudentPastFeedbackItems,
  submitFeedback,
  listOrganizerFeedbacks,
} = require('../controllers/eventFeedback.controller');

const router = express.Router();

const uploadEventImagesSafe = (req, res, next) => {
  uploadEventImages.array('images', 3)(req, res, (err) => {
    if (!err) return next();
    return res.status(400).json({
      message: err.message || 'Invalid event image upload payload',
    });
  });
};

// Organizer event endpoints
router.post('/', uploadEventImagesSafe, createLifecycleEvent);
router.post('/preview-simulation', previewEventSimulation);
router.get('/', listLifecycleEvents);
router.get('/overview', getOrganizerOverview);
router.get('/mine', listMyEvents);
router.get('/mine/feedbacks', listOrganizerFeedbacks);
router.get('/approved', listApprovedEvents);

// Student endpoints
router.get('/student/registrations', getStudentRegistrations);
router.get('/student/past-feedback', getStudentPastFeedbackItems);

// Faculty coordinator endpoints
router.get('/pending', listPendingEvents);
router.get('/faculty/all', listAllEventsForFaculty);
router.get('/:id/story-pdf', getEventStoryPdf);
router.get('/:id/resource-insights', getResourceInsights);
router.get('/:id', getLifecycleEvent);
router.put('/:id', uploadEventImagesSafe, updateLifecycleEvent);
router.patch('/:id/cancel', cancelLifecycleEvent);
router.delete('/:id', deleteLifecycleEvent);
router.post('/:id/checkin', checkInQr);
router.post('/:id/register', registerForEvent);
router.delete('/:id/register', unregisterFromEvent);
router.post('/:id/feedback', submitFeedback);
router.post('/:id/approve', approveEvent);
router.post('/:id/reject', rejectEvent);

module.exports = router;


// Fake commit on Wed Apr 01 00:41:16 2026 

// Fake commit on Thu Mar 12 02:04:38 2026 

// Fake commit on Thu Apr 09 12:12:40 2026 

// Fake commit on Fri Apr 03 02:11:57 2026 

// Fake commit on Thu Apr 23 19:13:18 2026 

// Fake commit on Sat Mar 28 20:04:34 2026 

// Fake commit on Sun Apr 05 16:19:56 2026 

// Fake commit on Tue Mar 17 15:29:49 2026 

// Fake commit on Sat Apr 25 13:53:46 2026 

// Fake commit on Fri Apr 24 15:43:28 2026 

// Fake commit #25 on 3/21/2026 6:16:24 AM

// Fake commit #29 on 3/31/2026 7:01:37 PM

// Fake commit #30 on 3/15/2026 3:57:11 AM

// Fake commit #81 on 3/3/2026 11:48:07 AM

// Fake commit #107 on 3/30/2026 12:02:07 AM

// Fake commit #122 on 4/19/2026 2:23:10 PM
