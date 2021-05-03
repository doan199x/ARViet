const cors = require("cors");
const express = require( "express");
const http = require( "http");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
const server = http.createServer(app);

app.get("/", (req,res) => {
    res.send(`⚡️ Running on port ${port}! ⚡️`);
});
app.use("/signup", require('./routers/signup'));
app.listen(`${port}`, () => {
console.log(`⚡️ Running on port ${port}! ⚡️`);
});