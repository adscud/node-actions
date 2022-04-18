require('dotenv').config();

const admin = require('firebase-admin');
const google = require('google-auth-library')
const credential = require("./firebase-sdk.json");

const send = async () => {
    const credential = require('./firebase-sdk.json')

    const app = admin.initializeApp({credential: admin.credential.cert(credential)});

    const jwtClient = new google.JWT(
        credential.client_email,
        null,
        credential.private_key,
        ["https://www.googleapis.com/auth/firebase.messaging"],
        null
    );

    const token = await jwtClient.authorize()

    const headers = {
        'Authorization': `Bearer ${token.access_token}`,
    }

    const targetToken = 'dLGI6rAWRAapXFN7jymcyg:APA91bEIrCgEiYGkRfjMhB5cQNSYeZv03d8iDmigLCFtlHicMib6XfI7TrqjAs2QPBUiRT8od4lgdOsm4EAXvgafKZ8UEk6V0SdJkMy3gnvdIJouEYLq5aXOg3UN6fsXVs1Mt8JwCN8Y'

    const message = {
        data: {
            score: '850',
            time: '2:45'
        },
        token: targetToken
    }

    admin.messaging().send(message)
        .then(response => {
            console.log('Successfully sent message:', response);
        })
        .catch(error => {
            console.log('Error sending message:', error);
        });
}

send()
    .catch(err => console.log(err))
