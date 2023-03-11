const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mailchimp = require("@mailchimp/mailchimp_marketing");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post('/', function (req, res) {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    console.log(firstName, lastName, email);

    mailchimp.setConfig({
        apiKey: "",
        server: "us17"
    });

    const event = {
        name: "JS Developers Meetup"
    };

    const footerContactInfo = {
        company: "Mailchimp",
        address1: "675 Ponce de Leon Ave NE",
        address2: "Suite 5000",
        city: "Atlanta",
        state: "GA",
        zip: "30308",
        country: "US"
    };

    const campaignDefaults = {
        from_name: "Gettin' Together",
        from_email: "gettintogether@example.com",
        subject: "JS Developers Meetup",
        language: "EN_US"
    };

    async function run() {
        const response = await mailchimp.lists.createList({
            name: event.name,
            contact: footerContactInfo,
            permission_reminder: "permission_reminder",
            email_type_option: true,
            campaign_defaults: campaignDefaults
        });

        console.log(
            `Successfully created an audience. The audience id is ${response.id}.`
        );
    }

    run();

})

app.listen(3000, function () {
    console.log('Listening on port 3000');
})

