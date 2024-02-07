const axios = require("axios");
const accountSid = "AC9f62a43da8b285ad0124e64494843a53";
const authToken = "82f122301db56f67ac66864268471920";
const client = require("twilio")(accountSid, authToken);
const { Vonage } = require("@vonage/server-sdk");
const serverless = require("serverless-http");

// const vonage = new Vonage({
//   apiKey: "0b017fc1",
//   apiSecret: "BgtTOQxyXNsZDL8I",
// });

const vonage = new Vonage({
  apiKey: "830fdd7e",
  apiSecret: "OZVSL3oTMzQhpqix",
});

const from = "Vonage APIs";
// const to = "923330403425";
const to = "923369804391";
const text = "Portal is Up my boy";

async function sendSMS() {
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log("Message sent successfully to awais");
      // console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages  to awais.");
      console.error(err);
    });
}

// Function to check website status
async function checkWebsiteStatus(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log(`Backend is ready for URL: ${url}`);
      client.messages
        .create({
          body: "Portal is up courses add kar lo or agar ma soya ho to mera bhe courses add kar dena my password is 86@BDFxn or pic tujha bheje hove ha us ma sa red wala choose karna ha or jo red ka laternative ha un ko choose mat karna baki common courses ka to pata he ha",
          from: "+12678840246",
          to: "+923204481009",
        })
        .then((message) =>
          console.log(message.sid, "Messaeg was send to jasid")
        )
        .catch((err) => console.log(err));
      sendSMS();
    } else {
      console.log(`Received status code ${response.status} for URL: ${url}`);
    }
  } catch (error) {
    console.error(`Error fetching URL ${url}:`, error.message);
  }
}

// URL to check
const websiteURL = "https://www.google.com/";

// Interval in milliseconds to repeat the check
const interval = 5000; // 5 seconds

// Repeat the check at specified interval

const mainFunc = () => {
  setInterval(() => {
    checkWebsiteStatus(websiteURL);
  }, interval);
};

module.exports.handler = serverless(mainFunc);
