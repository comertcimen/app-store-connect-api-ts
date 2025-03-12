import { createClient, defaultPlugins } from "@hey-api/openapi-ts";

createClient({
  client: "@hey-api/client-fetch",
  input: "app_store_connect_openapi.json",
  output: {
    path: "src/client",
    format: "prettier",
  },
  logs: {
    level: "error",
  },
  experimentalParser: false,
  plugins: [
    ...defaultPlugins,
    "@hey-api/schemas",
    {
      dates: true,
      name: "@hey-api/transformers",
    },
    {
      enums: "javascript",
      name: "@hey-api/typescript",
    },
    {
      name: "@hey-api/sdk",
      auth: false,
      transformer: true,
    },
  ],
});
