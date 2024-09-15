const http = require("http");
const app = require("./app");
const { setupMongoConnection } = require("./config/dbConnection");
const { setupSocket } = require("./config/socketSetup");

require("dotenv").config({ path: __dirname + "../../.env" });

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Setup Mongodb Connection
setupMongoConnection();

// Setup socket.io
setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});