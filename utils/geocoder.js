const NodeGeocoder = require("node-geocoder")

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "Bb5Y0MAguLRF8OphFnAePiZufOk1zoCr",
  formatter: null,
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder
