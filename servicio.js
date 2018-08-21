'use strict';

// Libreria express para crear un api rest
const express = require("express");
const bodyParser = require("body-parser");

// Para hacer peticiones http de forma simple
const request = require('request');

// Para usar express dentro de Node
const app = express();

// Definimos el puerto
const port = process.env.PORT || 8899;

// Traducción en tiempo real
const translate = require('google-translate-api');

// Middleware de análisis del cuerpo de Node.js 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Métodos de ruta (VERBOS HTTP: POST, GET, PUT, DELETE, etc...). Endpoint

app.post("/", (req, res) => {

    // JSON QUE ENVIA DIALOGFLOW
    let url = req.body.result.parameters["any"];

    

    // Realizamos la petición
    request(url, function(error, response, body) {
        // Convertimos a JSON, la respuesta del servicio
        let _body = JSON.parse(body);

        // Que no de error el servicio externo
        if (_body.cod === '200') {

           

            // Formamos la respuesta que enviaremos a Dialogflow
            let _response = new Object();

            // DEFAULT RESPONSE EN DIALOGFLOW
            _response.speech = `No. Debería conocer a ${url}`;
            _response.displayText = _response.speech;
            _response.source = "webhook";

            // Enviamos la respuesta 
            res.status(_body.cod).send(_response);
        }
    });
});


// Escuchando nuestro servidor Node
app.listen(port, () => {
    console.log(`API REST en el puerto: http://localhost:${port}`);
});