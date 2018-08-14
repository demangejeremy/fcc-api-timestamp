// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// My first endpoint for API
app.get("/api/timestamp", function(req, res) {
  var unix = new Date().getTime();
  var utc = new Date().toUTCString();
  res.json({"unix": unix, "utc": utc});
});

// The endpoint with parameter
app.get("/api/timestamp/:datastring", function(req, res) {
  var theResult = req.params.datastring;
  theResult = Number(theResult);
  console.log(typeof theResult);
  if (typeof theResult == "number") {
    var newUnix = new Date(theResult);
    var utc = newUnix.toUTCString();
    if (utc == "Invalid Date") {
      utc = new Date(req.params.datastring);
      var newUtc = utc.toUTCString();
      newUnix = utc.getTime();
      if (newUtc == "Invalid Date") {
        res.json({"error" : "Invalid Date" });
      } else {
      res.json({"unix": newUnix, "utc": newUtc});
      }
    } else {
      res.json({"unix": theResult, "utc": utc});
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});