const cors = require("cors");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser")
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3001;

//Middleware
app.use(express.static('public'))
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({limit: 524288000, extended: true })); 
// For parsing application/json
app.use(express.json());
// // For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true }));
app.use(morgan('dev'));

// Server.buildServices(app) for socket
//const server = http.createServer(app);
app.get("/", (req, res) => {
    res.send(`⚡️ Running on port ${port}! ⚡️`);
});
//Web
app.use("/signup", require('./routers/signup'));
app.use("/signin", require('./routers/signin'));
app.use("/lecture", require('./routers/lecture'));

//Mobile
app.use("/login", require('./routers/login'));
app.use("/lesson", require('./routers/lesson'));
app.use("/arcontent", require('./routers/arcontent'));
app.use("/marker", require('./routers/marker'));
app.listen(`${port}`, () => {
    console.log(`⚡️ Running on port ${port}! ⚡️`);
});