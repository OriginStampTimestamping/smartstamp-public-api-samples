# Receiving and Processing Artwork Registered Webhook

This samples demonstrates how to implement an endpoint to receive webhooks from the SmartStamp platform, and how to process the `artwork.registration.completed` webhook.

The endpoint is implemented as a node.js function that is designed to run as a Firebase Cloud Function.
The sample includes the possibility to deploy to Firebase.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Development](#development)
- [Build](#build)
- [Deployment](#deployment)

## Prerequisites

1. Activate the correct node environment that's configured in `.nvmrc`:

```shell
nvm use
```

2. Install node dependencies:

```shell
npm install
```


## Development

In order to develop with hot reload, you have to run the following command:
```shell
npm run build:watch
```

Then, you have to run the emulator in a separate terminal:
```shell
firebase emulators:start --only functions
```
```
i  emulators: Starting emulators: functions
i  functions: Watching "/.../smartstamp-api-samples/webhook-artwork-registered/functions" for Cloud Functions...
✔  functions: Using node@18 from host.
✔  functions: Loaded functions definitions from source: processSmartStampWebhook.
✔  functions[europe-west6-processSmartStampWebhook]: http function initialized (http://127.0.0.1:5001/webhook-artwork-registered/europe-west6/processSmartStampWebhook).

┌─────────────────────────────────────────────────────────────┐
│ ✔  All emulators ready! It is now safe to connect your app. │
│ i  View Emulator UI at http://127.0.0.1:4000/               │
└─────────────────────────────────────────────────────────────┘

┌───────────┬────────────────┬─────────────────────────────────┐
│ Emulator  │ Host:Port      │ View in Emulator UI             │
├───────────┼────────────────┼─────────────────────────────────┤
│ Functions │ 127.0.0.1:5001 │ http://127.0.0.1:4000/functions │
└───────────┴────────────────┴─────────────────────────────────┘
```

Afterwards, webhook endpoint will be reachable at, e.g.: 
`http://localhost:5001/europe-west6/processSmartStampWebhook`

Invoking it via cURL returns the expected results:
```
curl --location --request GET 'http://127.0.0.1:5001/webhook-artwork-registered/europe-west6/processSmartStampWebhook'
```
```
HTTP 400
{
    "errorCode": 1000,
    "errorMessage": "Failed to process webhook.",
    "data": null
}
```

```
curl --location --request GET 'http://127.0.0.1:5001/webhook-artwork-registered/europe-west6/processSmartStampWebhook' \
--header 'Authorization: expectedSmartStampSignature'
```
```
HTTP 501
{
    "errorCode": 1001,
    "errorMessage": "Unsupported event type \"undefined\".",
    "data": null
}
```

```
curl --location --request GET 'http://127.0.0.1:5001/webhook-artwork-registered/europe-west6/processSmartStampWebhook' \
--header 'Authorization: expectedSmartStampSignature' \
--header 'Content-Type: application/json' \
--data-raw '{
    "eventType": "artwork.registration.completed",
    "artwork": {
        "objectId": "fooofofof"
    }
}'
```
```
HTTP 404
{
    "errorCode": 1002,
    "errorMessage": "Could not find artwork with objectId \"fooofofof\".",
    "data": null
}
```

```
curl --location --request GET 'http://127.0.0.1:5001/webhook-artwork-registered/europe-west6/processSmartStampWebhook' \
--header 'Authorization: expectedSmartStampSignature' \
--header 'Content-Type: application/json' \
--data-raw '{
    "eventType": "artwork.registration.completed",
    "artwork": {
        "objectId": "some-artwork-id"
    }
}'
```
```
HTTP 200
{
    "errorCode": 0,
    "errorMessage": null,
    "data": {
        "artwork": {
            "objectId": "some-artwork-id"
        }
    }
}
```

### Build

To build the app use:

```shell
npm run build
```

### Deployment

To deploy your app to Firebase, set up your Firebase project:

```shell
firebase login
```

Set up your Firebase project:
```shell
firebase use {project_id}
```

Then, deploy your app:

```shell
firebase deploy --only functions:processSmartStampWebhook
```

## Troubleshooting

TBD