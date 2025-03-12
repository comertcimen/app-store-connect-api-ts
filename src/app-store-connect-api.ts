import { generateAuthToken, type AuthToken } from "./auth";
import { client } from "./client/client.gen";

const createAppStoreConnectApiClient = async ({
  privateKeyId,
  issuerId,
  privateKey,
}: {
  privateKeyId: string;
  issuerId: string;
  privateKey: string;
}) => {
  const api = await import("./client/sdk.gen");
  let authToken: AuthToken | undefined = undefined;
  client.interceptors.request.use(async (request) => {
    if (!authToken || authToken.expireAt < Date.now()) {
      authToken = await generateAuthToken({
        privateKeyId: privateKeyId,
        issuerId: issuerId,
        privateKey: privateKey,
      });
    }

    request.headers.set("Authorization", `Bearer ${authToken.token}`);
    return request;
  });

  const apiWrapper = {
    ...(api as Omit<typeof api, "client">),
  };
  delete (apiWrapper as any).client;

  //wrap all functions, pass the client into options object, if not already present
  for (const key in apiWrapper) {
    //forego the type checking, as it is very slow with hundreds of functions
    const value = (apiWrapper as any)[key];

    if (typeof value === "function") {
      (apiWrapper as any)[key] = async (...args: any[]) => {
        if (args.length == 0) {
          args.push({
            client: client,
          });
        } else {
          args[0] = {
            client: client,
            ...args[0],
          };
        }

        return value(...args);
      };
    }
  }

  return apiWrapper;
};

export default createAppStoreConnectApiClient;
