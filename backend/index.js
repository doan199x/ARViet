const cors = require("cors");
const express = require( "express");
const http = require( "http");
const bodyParser = require("body-parser")
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3001;

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Server.buildServices(app) for socket
//const server = http.createServer(app);

app.get("/", (req,res) => {
    res.send(`⚡️ Running on port ${port}! ⚡️`);
});
app.use("/signup", require('./routers/signup'));
app.use("/signin", require('./routers/signin'));
app.use("/login", require('./routers/login'));
app.use("/lesson", require('./routers/lesson'));
app.listen(`${port}`, () => {
console.log(`⚡️ Running on port ${port}! ⚡️`);
});