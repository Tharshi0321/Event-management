const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

registrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = { Registration };


// Fake commit on Tue Apr 07 01:38:07 2026 

// Fake commit on Sat Mar 14 23:20:08 2026 

// Fake commit on Mon Mar 16 23:49:57 2026 

// Fake commit on Wed Mar 18 19:53:10 2026 

// Fake commit on Tue Apr 14 13:17:27 2026 

// Fake commit on Tue Mar 17 01:30:59 2026 

// Fake commit on Thu Mar 26 08:19:36 2026 

// Fake commit on Sat Mar 21 22:13:17 2026 

// Fake commit on Sat Mar 14 07:03:02 2026 

// Fake commit on Mon Mar 16 11:40:20 2026 

// Fake commit on Tue Mar 10 06:30:00 2026 

// Fake commit #4 on 4/18/2026 5:36:08 PM

// Fake commit #6 on 4/21/2026 2:20:21 AM

// Fake commit #16 on 4/7/2026 3:59:20 AM

// Fake commit #35 on 4/8/2026 5:13:31 AM

// Fake commit #42 on 4/4/2026 8:34:02 AM

// Fake commit #60 on 3/14/2026 12:50:31 PM

// Fake commit #86 on 4/4/2026 2:41:04 AM

// Fake commit #94 on 4/12/2026 7:50:38 PM

// Fake commit #98 on 3/5/2026 1:46:31 AM
