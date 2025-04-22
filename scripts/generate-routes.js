import { generateRouteTree } from "@tanstack/router-plugin";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

generateRouteTree({
  routesDirectory: resolve(__dirname, "../src/routes"),
  generatedRouteTree: resolve(__dirname, "../src/routeTree.gen.js"),
});
