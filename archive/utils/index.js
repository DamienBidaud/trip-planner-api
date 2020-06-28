const location = require("./location");
const activity = require("./activity");
const trip = require("./trip");

module.exports = {
  ...location,
  ...activity,
  ...trip
};
