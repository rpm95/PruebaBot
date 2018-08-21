'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/conoces', function(req, res){
    var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.any
      ? req.body.result.parameters.any
      : "Seems like some problem. Speak again.";
    return res.json({
        speech: speech,
        displayText: speech,
        source: "webhook-echo-sample"
    });
});