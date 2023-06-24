const { express, app } = require("./server/server")
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import bodyParser from "body-parser";

require("./DB/DBconnection")

///body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(
    cors({
        origin: true,
        exposedHeaders: ["Content-Length", "Bearer"],
    })
);

//ROUTES
const userRoute = require("./routes/user");

app.use("", userRoute);

export default app;
