const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


const db = admin.database();
const TWELVE_HOURS = 12 * 60 * 60 * 1000;

exports.markEventsCompletedAfterTwelveHours = functions.pubsub.schedule('every 5 minutes')
  .onRun(async context => {
    db.ref('venues').orderByChild("startDate")
      .endAt(Date.now() - TWELVE_HOURS)
      .once('value', snap => snap.forEach(venue => {
        console.log(`found expired event: ${venue.key}, moving to endedEvents...`);
        db.ref('endedEvents/' + venue.key).set(venue.val());
        db.ref('venues').child(venue.key).remove();
      }));
  });
