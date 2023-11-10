/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as AWS from "aws-sdk";

AWS.config.update({ region: "us-west-2" });

// create an ec2 object
const ec2 = new AWS.EC2();

// setup instance params
export const stopminecraftserver = onRequest({ cors: true }, (req, res) => {
  if (req.header("authorization") !== process.env.AUTHENTICATION_TOKEN)
    res.status(401).send("Error: Unauthorized.");

  ec2.stopInstances(
    {
      InstanceIds: ["i-0ffb2af61a7236581"],
    },
    function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(data); // successful response
      }
    },
  );

  res.send("Stop Successful");
});

export const startminecraftserver = onRequest({ cors: true }, (req, res) => {
  if (req.header("authorization") !== process.env.AUTHENTICATION_TOKEN)
    res.status(401).send("Error: Unauthorized.");

  ec2.startInstances(
    {
      InstanceIds: ["i-0ffb2af61a7236581"],
    },
    function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(data); // successful response
      }
    },
  );

  res.send("Start Successful");
});
