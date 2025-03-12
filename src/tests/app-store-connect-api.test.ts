import { beforeAll, describe, expect, test } from "bun:test";
import createAppStoreConnectApiClient from "../app-store-connect-api";

const { PRIVATE_KEY_ID, ISSUER_ID, PRIVATE_KEY } = process.env;

beforeAll(() => {
  //ensure that the environment variables are set
  const missingVars = [];
  if (!PRIVATE_KEY_ID) missingVars.push("PRIVATE_KEY_ID");
  if (!ISSUER_ID) missingVars.push("ISSUER_ID");
  if (!PRIVATE_KEY) missingVars.push("PRIVATE_KEY");

  if (missingVars.length > 0) {
    console.error(`Missing environment variables: ${missingVars.join(", ")}`);
    console.error(`Can not run tests without these variables! Exiting test...`);
    process.exit(1);
  }
});

describe("Client", async () => {
  const appStoreConnectApi = await createAppStoreConnectApiClient({
    issuerId: ISSUER_ID!,
    privateKeyId: PRIVATE_KEY_ID!,
    privateKey: PRIVATE_KEY!,
  });

  test("Should be able to fetch an app", async () => {
    const response = await appStoreConnectApi.appsGetCollection({
      query: {
        limit: 1,
      },
    });

    expect(response.error).toBeUndefined();
    expect(response.data).toBeDefined();
  });
});
