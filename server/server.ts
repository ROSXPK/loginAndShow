import express from "express";
import { createServer } from "http";
const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
server.listen(port, () => {
    console.log(`Connection is setup at ${port}`);
});

module.exports = { express, app, server }