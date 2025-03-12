# comertcimen/app-store-connect-api-ts

A package that provides typesafe access to the [App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi).

This is for devs who just want to access the App Store Connect API for their internal tools. Just pass in your authentication details and start sending requests.

## Install

```bash
npm install @comertcimen/app-store-connect-api-ts
```

## App Store Connect API Version

```
3.8.0
```

## How to use

```typescript
import createAppStoreConnectApiClient from "@comertcimen/app-store-connect-api-ts";

const { PRIVATE_KEY_ID, ISSUER_ID, PRIVATE_KEY } = process.env; //or whereever you store them

const appStoreConnectApi = await createAppStoreConnectApiClient({
  issuerId: ISSUER_ID!,
  privateKeyId: PRIVATE_KEY_ID!,
  privateKey: PRIVATE_KEY!,
});

const apps = await appStoreConnectApi.appsGetCollection({
  query: {
    limit: 1,
  },
});
```

## How this package was authored

- Forked from [Repo](https://github.com/Timbo-Jimbo/App-Store-Connect-API-ts)
- The code is generated from the official App Store Connnect API OpenAPI Spec [found here](https://developer.apple.com/documentation/appstoreconnectapi).
- [Hey API](https://github.com/hey-api/openapi-ts) is used to generate the code.
- A thin wrapper class was written as an access point to the generated code. It also provides methods for managing the configuration.
- [appstore-connect-sdk](https://github.com/isaced/appstore-connect-sdk) was used as reference for the authentication logic
