require('dotenv').config();
const apn = require('apn');

const options = {
    token: {
        key: `${__dirname}/AuthKey_${process.env.KEY_ID}.p8`,
        keyId: process.env.KEY_ID,
        teamId: process.env.TEAM_ID
    },
    production: false
};

const apnProvider = new apn.Provider(options);
const notification = new apn.Notification()

notification.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
notification.sound = "ping.aiff";
notification.alert = "\uD83D\uDCE7 \u2709 You have a new message";
notification.payload = {'messageFrom': 'John Appleseed'};
notification.topic = `${process.env.BUNDLE_ID}`;

console.log(notification)

apnProvider.send(notification, `${process.env.DEVICE_TOKEN}`).then(result => {
    console.log(result.failed);
});
