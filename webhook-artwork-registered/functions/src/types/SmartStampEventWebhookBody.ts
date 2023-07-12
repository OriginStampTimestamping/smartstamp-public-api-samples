/**
 * The body of the SmartStamp event webhook that is sent to a defined webhook endpoint.
 */
export interface SmartStampEventWebhookBody {
  partner: SmartStampEventWebhookBodyPartner;
  /**
   * The event type the webhook informs about.
   */
  eventType: SmartStampEventWebhookBodyEventType;
  /**
   * The schema version of the webhook contents.
   */
  schemaVersion: number;
  artwork: SmartStampEventWebhookBodyArtwork;
}

export interface SmartStampEventWebhookBodyPartner {
  /**
   * Your partner ID that you received from the SmartStamp Team for your SmartStamp integration.
   */
  id: string;
}

export enum SmartStampEventWebhookBodyEventType {
  ArtworkRegistrationCompleted = "artwork.registration.completed",
  ArtworkVerificationCompleted = "artwork.verification.completed",
}

export interface SmartStampEventWebhookBodyArtwork {
  /**
   * The artwork's unique ID (UUID).
   */
  id: string;
  /**
   * ISO8601 string of the date and time, the artwork was created within SmartStamp.
   */
  dateCreated: string;
  /**
   * ISO8601 string of the date and time, the artwork will expire within SmartStamp.
   */
  dateExpiration: string;
  /**
   * ISO8601 string of the date and time, the artwork was last updated within SmartStamp.
   */
  dateUpdated: string;
  /**
   * A descriptive title of the artwork.
   */
  title: string;
  /**
   * Freely styled field for a publication or creation date.
   */
  date?: string;
  /**
   * Description of the dimensions of the artwork.
   */
  dimensions?: string;
  /**
   * Description of the medium used.
   */
  medium?: string;
  /**
   * Free text field for notes about the artwork.
   */
  notes?: string;
  /**
   * General information about the artist who created this artwork.
   */
  artist?: SmartStampEventWebhookBodyArtworkArtist;
  eventLog: SmartStampEventWebhookBodyArtworkEventLog;
  /**
   * The number of fingerprints registered with the patented SmartStamp technology on the artwork's surface.
   */
  numberOfFingerPrints: number;
  /**
   * An individual, non-unique object ID that can freely be defined by, e.g., a museum. It allows to identify the artwork within a collection, or a third party system that integrates with the SmartStamp platform.
   */
  objectId?: string;
  /**
   * State of the painting within SmartStamp. This defines which actions can be carried out with the SmartStamp app and within the SmartStamp platform.
   */
  state: SmartStampEventWebhookBodyState;
}

export interface SmartStampEventWebhookBodyArtworkArtist {
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

export interface SmartStampEventWebhookBodyArtworkEventLog {
  /**
   * Capability URL that allows access to the artwork's event log. It contains all events that occurred within the lifetime of the artwork. WARNING: This property is to be treated as a secret and should only be revealed to users who should be able to access the artwork's event log.
   */
  shareLink: string;
}

export enum SmartStampEventWebhookBodyState {
  Trial = "TRIAL",
  Paid = "PAID",
  Unpaid = "UNPAID",
}
