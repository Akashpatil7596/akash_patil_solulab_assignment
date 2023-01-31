const http = require('http');
const app = require('./app');

const port = 8000;

app.listen(8000, "127.0.0.1", () => {
    console.log("Listening To request at Port 8000");
  });