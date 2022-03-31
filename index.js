const querystring = require("querystring");
const inquirer = require('inquirer');

const {Curl} = require("node-libcurl");

const curlTest = new Curl();

const terminate = curlTest.close.bind(curlTest);

curlTest.setOpt(Curl.option.URL, "https://exp.host/--/api/v2/push/send");
curlTest.setOpt(Curl.option.POST, true);

inquirer
    .prompt([
        {
            name: 'token',
            message: 'Device token (must be an Expo Go token)',
        },
        {
            name: 'title',
            message: 'What is the notification title?'
        },
        {
            name: 'body',
            message: 'What is the notification body?'
        },
        {
            type: 'list',
            name: 'notification-type',
            message: 'Which kind of notification do you want to send ?',
            choices: [
                "post-receive-like",
                "post-receive-like-token",
                "post-receive-comment",
                "post-has-been-purchased",
                "post-has-been-resposted",
                "you-receive-kos",
                "you-receive-kos-with-message",
                "you-have-new-follower",
                "you-have-request-follower",
                "user-publish-for-the-first-time",
                "user-joins-ko",
                "new-badge-unlocked",
            ]
        }
    ])
    .then(res => {
        curlTest.setOpt(
            Curl.option.POSTFIELDS,
            querystring.stringify({
                to: `ExponentPushToken[${res['token']}]`,
                title: res['title'],
                body: res['body'],
                data: JSON.stringify({
                    type: res['notification-type'],
                    actor: {
                        _id: 'johndoe',
                        displayName: 'John',
                    },
                    target: {
                        type: 'Post',
                        _id: 'postId',
                    },
                    at: new Date(),
                })
            })
        );

        curlTest.on("end", function (statusCode, data, headers) {
            console.info("Status code " + statusCode);
            console.info("***");
            console.info("Our response: " + data);
            console.info("***");
            console.info("Length: " + data.length);
            console.info("***");
            console.info("Total time taken: " + this.getInfo("TOTAL_TIME"));

            this.close();
        });
        curlTest.on("error", terminate);

        curlTest.perform()
    })

