/*
 * spacebrew-x10
 * https://github.com/randallagordon/spacebrew-x10
 *
 * Copyright (c) 2014 Randall A. Gordon <randall@randallagordon.com>
 * Licensed under the MIT license.
 */

"use strict";

var Spacebrew = require("spacebrew.js").Spacebrew,
    x10 = require("x10");

var sb, cm11;

var defaults = {
  server: "sandbox.spacebrew.cc",
  name: "X10 -> Spacebrew",
  description: "X10 events, on Spacebrew! Code on GitHub: https://github.com/randallagordon/spacebrew-x10"
};

// Handlers
function handleSB(name, value) {
  var message = name.split(" - "),
      house = message[0].replace("House Code ", ""),
      unit = "UNIT_" + message[1];

  console.log("Spacebrew Message: %s %s", name, value);

  if (value) {
    cm11.sendCommand({house: x10.HOUSE[house], unit: x10.UNIT[unit]}, x10.FUNCTION.ON, function(err) {
      if (err) { return console.log(err); }
      console.log("      X10 Message: ON");
    });
  } else {
    cm11.sendCommand({house: x10.HOUSE[house], unit: x10.UNIT[unit]}, x10.FUNCTION.OFF, function(err) {
      if (err) { return console.log(err); }
      console.log("      X10 Message: OFF");
    });
  }
}

function handleX10() {
  // TODO: Publish X10 messages!
}

// Spacebrew Functions
module.exports.connect = function(done, opts) {
  opts = opts || { x10: { serialPath: "/dev/ttyUSB0" }};

  cm11 = new x10.CM11(opts.x10);

  sb = new Spacebrew.Client(opts.server || defaults.server,
    opts.name || defaults.name,
    opts.description || defaults.description);

  sb.onBooleanMessage = handleSB;
  sb.onOpen = done;
  sb.connect();
};

module.exports.addRange = function(house, lowerBound, upperBound) {
  console.log("Connecting House Code %s - Units %s to %s", house, lowerBound, upperBound);
  for (var i = lowerBound; i <= upperBound; i++) {
    sb.addSubscribe("House Code " + house + " - " + i, "boolean");
  }
};
