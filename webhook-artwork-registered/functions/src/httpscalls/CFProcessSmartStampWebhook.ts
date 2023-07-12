import * as functions from "firebase-functions";
import {SmartStampEventWebhookBody, SmartStampEventWebhookBodyEventType} from "../types/SmartStampEventWebhookBody";

/**
 * Simulated local database of integration partner.
 */
const artworks = [
  {
    ourId: "dhfd-dddf-4das-d45f",
    someOfOurData: "this",
    someOtherData: "that",
    smartStamp: {
      objectId: "some-artwork-id",
    },
  },
];
/**
 * Simulates searching for a matching artwork in the local database.
 */
const findArtwork = (smartStampObjectId: string): any => {
  const artwork = artworks.find((el) => el.smartStamp.objectId === smartStampObjectId);
  return artwork || null;
};

/**
 * Simulates upserting an artwork in the local database.
 */
const upsertArtwork = (objectId: string, dataToUpdate: any) => {
  // TODO Implement
};

const returnSuccess = (response: any, data: any = null) => {
  response.status(200).send({
    errorCode: 0,
    errorMessage: null,
    data: data,
  });
};

const returnError = (response: any, errorCode: number, errorMessage: string, httpCode: number = 400): void => {
  response.status(httpCode).send({
    errorCode: errorCode,
    errorMessage: errorMessage,
    data: null,
  });
};

const processSmartStampWebhook = async (request: any, response: any): Promise<any> => {
  try {
    // Check for expected header to ensure request is coming from the SmartStamp platform.
    const authHeader = request.get("authorization");
    // The expected signature is communicated during partner onboarding with SmartStamp.
    // FIXME: It should not be hard-coded, but read from a secure storage, e.g., firebase functions config.
    if (authHeader !== "expectedSmartStampSignature") {
      return returnError(response, 1000, "Could not verify request origin.", 401);
    }

    // Request is originating from SmartStamp, let's process it.
    const webhook = request.body as SmartStampEventWebhookBody;
    if (webhook.eventType !== SmartStampEventWebhookBodyEventType.ArtworkRegistrationCompleted) {
      return returnError(response, 1001, `Unsupported event type "${webhook.eventType}".`, 501);
    }

    // Let's process the artwork.registration.completed event.
    // FIXME: Instead of simulating something here, actually update your database, e.g.
    const artwork = webhook.artwork;
    console.log(`Finding matching artwork in our database by objectId "${artwork.objectId}"...`);
    if (!artwork.objectId) {
      return returnError(response, 1002, `Could not find artwork with objectId "${artwork.objectId}".`, 404);
    }
    const matchedArtwork = findArtwork(artwork.objectId);
    if (!matchedArtwork) {
      return returnError(response, 1002, `Could not find artwork with objectId "${artwork.objectId}".`, 404);
    }

    // Update SmartStamp details in our database to be shown to our users.
    upsertArtwork(artwork.objectId, {
      smartStamp: artwork,
    });

    return returnSuccess(response, {
      artwork: {
        objectId: artwork.objectId,
      },
    });
  } catch (e: any) {
    return returnError(response, 1, "Failed to process webhook.", 500);
  }
};

export default functions.region("europe-west6").https.onRequest(processSmartStampWebhook);
