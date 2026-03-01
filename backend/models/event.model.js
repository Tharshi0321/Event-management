const mongoose = require('mongoose');

const EVENT_TYPES = ['academic', 'work', 'sports', 'social'];
const EVENT_STATUSES = ['pending', 'approved', 'rejected', 'cancelled', 'completed'];

const decisionSchema = new mongoose.Schema(
  {
    decidedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    decidedAt: { type: Date, default: null },
    rejectionReason: { type: String, default: '', trim: true },
    /** Optional note from approver (shown to organizer) */
    approvalNote: { type: String, default: '', trim: true },
  },
  { _id: false },
);

const resubmissionSchema = new mongoose.Schema(
  {
    wasRejectedBefore: { type: Boolean, default: false },
    previousRejectionReason: { type: String, default: '' },
  },
  { _id: false },
);

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, default: '', trim: true },
    description: { type: String, default: '', trim: true },
    type: { type: String, required: true, enum: EVENT_TYPES },
    date: { type: Date, required: true },
    time: { type: String, required: true, trim: true },
    place: { type: String, required: true, trim: true },
    location: { type: String, default: '', trim: true },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    durationMinutes: { type: Number, default: 60, min: 1 },
    totalSeats: { type: Number, required: true, min: 1 },
    thumbnailUrl: { type: String, default: '', trim: true },
    images: [{ type: String, trim: true }],
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: EVENT_STATUSES, default: 'pending' },
    decision: { type: decisionSchema, default: () => ({}) },
    resubmission: { type: resubmissionSchema, default: () => ({}) },
    cancellationReason: { type: String, default: '', trim: true },
    /** Soft delete (Recycle Bin) */
    deletedAt: { type: Date, default: null, index: true },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

eventSchema.index({ status: 1, startTime: 1 });
eventSchema.index({ createdBy: 1 });
eventSchema.index({ deletedAt: 1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = {
  Event,
  EVENT_TYPES,
  EVENT_STATUSES,
};

// Fake commit on Thu Mar 12 00:33:00 2026 

// Fake commit on Thu Apr 09 02:12:07 2026 

// Fake commit on Sat Mar 14 19:59:27 2026 

// Fake commit on Fri Mar 06 01:59:18 2026 

// Fake commit on Sat Mar 14 09:53:52 2026 

// Fake commit on Fri Apr 10 13:13:14 2026 

// Fake commit on Sat Apr 18 03:32:20 2026 

// Fake commit on Tue Mar 03 04:50:03 2026 

// Fake commit on Wed Apr 15 13:45:29 2026 

// Fake commit on Sun Apr 12 22:05:32 2026 

// Fake commit on Fri Apr 24 15:36:37 2026 

// Fake commit on Mon Apr 13 22:31:41 2026 

// Fake commit #26 on 3/12/2026 8:27:40 PM

// Fake commit #27 on 4/18/2026 8:08:49 PM

// Fake commit #41 on 3/6/2026 2:43:25 AM

// Fake commit #56 on 4/14/2026 4:13:17 AM

// Fake commit #68 on 3/27/2026 2:42:02 PM

// Fake commit #85 on 3/8/2026 6:38:53 PM

// Fake commit #108 on 3/14/2026 1:45:02 AM
