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
notification.badge = 0
notification.alert = {
    body: "Adilie a liké votre post.",
    url: "ko://post/00686590-aa9a-11ec-8080-800016729b9f/8dc26df0abe4959c3f6d44fd/618e495a19edd000035050b3/true/true",
}
notification.topic = `${process.env.BUNDLE_ID}`;
/*
*
* {
    "actorId": "618e495a19edd000035050b3",
    "postActivityId": "00686590-aa9a-11ec-8080-800016729b9f",
    "postId": "8dc26df0abe4959c3f6d44fd",
  },
*
* */

apnProvider.send(notification, `${process.env.DEVICE_TOKEN}`).then(result => {
    console.log(result)
    process.exit(1)
});
