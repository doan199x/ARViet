const cors = require("cors");
const express = require( "express");
const http = require( "http");
const bodyParser = require("body-parser")

const app = express();
const port = process.env.PORT || 3001;

//Middleware
app.use(cors());
app.use(bodyParser.json());

// Server.buildServices(app) for socket
//const server = http.createServer(app);

app.get("/", (req,res) => {
    res.send(`⚡️ Running on port ${port}! ⚡️`);
});
app.use("/signup", require('./routers/signup'));
app.use("/login", require('./routers/login'));
app.listen(`${port}`, () => {
console.log(`⚡️ Running on port ${port}! ⚡️`);
});