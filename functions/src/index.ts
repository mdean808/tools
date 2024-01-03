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
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import serviceAccount from "../firebase-auth";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  databaseURL: "https://friendsfm-default-rtdb.firebaseio.com",
});

const db = getFirestore();

export const getactiverminecraftserver = onRequest(
  { cors: true },
  async (_req, res) => {
    const query = await db
      .collection("minecraft")
      .where("active", "==", true)
      .get();
    const ref = query.docs[0].ref;

    res.json((await ref.get()).data());
  },
);

export const startminecraftserver = onRequest(
  { cors: true },
  async (req, res) => {
    if (req.header("authorization") !== process.env.AUTHENTICATION_TOKEN)
      res.status(401).send("Error: Unauthorized.");

    const ref = db
      .collection("minecraft")
      .doc(JSON.parse(req.body || {})?.server_name);
    await ref.update({ active: true });
    const instancesClient = new InstancesClient();
    try {
      await instancesClient.start({
        instance: "minecraft-server",
        project: "morgan-s-tools",
        zone: "us-west1-a",
      });
      await ref.update({ status: "started", startDate: Timestamp.now() });
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

    const query = await db
      .collection("minecraft")
      .where("active", "==", true)
      .get();
    const ref = query.docs[0].ref;
    await ref.update({ active: false });
    const instancesClient = new InstancesClient();
    try {
      await instancesClient.stop({
        instance: "minecraft-server",
        project: "morgan-s-tools",
        zone: "us-west1-a",
      });
      await ref.update({ status: "stopped", stopDate: Timestamp.now() });
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }

    res.send("Stop Successful");
  },
);
