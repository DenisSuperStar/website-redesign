import express from "express";
import { ServerAddress } from "server-address";
import http from "http";
import debug from "debug";

const app = express();
const server = http.createServer(app);
/**
 * Event listener for HTTP server "listening" event.
 */

export default function onListening() {
  let addr = ServerAddress;
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
