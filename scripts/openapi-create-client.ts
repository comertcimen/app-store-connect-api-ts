import { createClient, defaultPlugins } from "@hey-api/openapi-ts";

createClient({
  input: "app_store_connect_openapi.json",
  output: {
    path: "src/client",
    format: "prettier",
  },
  logs: {
    level: "error",
  },
  plugins: [
    ...defaultPlugins,
    "@hey-api/schemas",
    "@hey-api/client-fetch",
    {
      enums: "javascript",
      name: "@hey-api/typescript",
    },
  ],
});
