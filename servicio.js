const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const server = express();

//Construcción del servidor
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());

//Gestion de la peticion
server.post('/get-movie', (req,res) => {
    const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
const reqUrl = encodeURI(`http://www.omdbapi.com`);
http.get(reqUrl, (responseFromAPI) => {
    let completeResponse = '';
responseFromAPI.on('data', (chunk) => {
    completeResponse += chunk;
});
responseFromAPI.on('end', () => {
    //const movie = JSON.parse(completeResponse);
    //let dataToSend = movieToSearch === 'The Godfather' ? `No tengo la informacion requerida. Aqui tienes algo de informacion de 'The Godfather'.\n` : '';
    //dataToSend += `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;

    return res.json({
        speech: 'Quieres informacion de ${movieToSearch} ?. Buscala en Google.',
        displayText: 'Quieres informacion de ${movieToSearch} ?. Buscala en Google.',
        source: 'get-movie'
    });
});
}, (error) => {
    return res.json({
        speech: 'Something went wrong!',
        displayText: 'Something went wrong!',
        source: 'get-movie'
    });
});
});


server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});
