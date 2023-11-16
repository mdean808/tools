/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import { InstancesClient } from "@google-cloud/compute";

export const startminecraftserver = onRequest(
  { cors: true },
  async (req, res) => {
    if (req.header("authorization") !== process.env.AUTHENTICATION_TOKEN)
      res.status(401).send("Error: Unauthorized.");

    const instancesClient = new InstancesClient();
    try {
      await instancesClient.start({
        instance: "minecraft-server",
        project: "morgan-s-tools",
        zone: "us-west1-a",
      });
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }

    res.send("Start Successful");
  },
);

export const stopminecraftserver = onRequest(
  { cors: true },
  async (req, res) => {
    if (req.header("authorization") !== process.env.AUTHENTICATION_TOKEN)
      res.status(401).send("Error: Unauthorized.");

    const instancesClient = new InstancesClient();
    try {
      await instancesClient.stop({
        instance: "minecraft-server",
        project: "morgan-s-tools",
        zone: "us-west1-a",
      });
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }

    res.send("Stop Successful");
  },
);
