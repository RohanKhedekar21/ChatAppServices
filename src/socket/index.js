const chatEvents = require("./chatEvents");
const userEvents = require("./userEvents");

module.exports = function (socket) {
  chatEvents(socket);
  userEvents(socket);
};
