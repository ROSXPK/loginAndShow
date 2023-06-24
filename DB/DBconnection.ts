
const express = require("express");
const DBconnection = express();
import { set, connect, connection } from "mongoose"
//DB CONNECTION
set("strictQuery", false);
connect(`${process.env.dbKey}`,
    {
        autoIndex: true,
        ssl: true,
        sslValidate: true
    }
);
connection.on("error", (err) => {
    console.log(`GOT AN ERROR--${err}`);
});
connection.on("connected", () => {
    console.log(`Database Connected`);
});
connection.on("disconnected", () => {
    console.log(`Database Disconnected`);
});



export default DBconnection;