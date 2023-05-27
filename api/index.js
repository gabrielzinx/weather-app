const http = require('http');
const URL = require('url');
const port = 3000;

const CLIENT_API_KEY = process.env.CLIENT_WEATHER_KEY;

async function getWeatherCity(city) {
    const response = await fetch(`https://api.hgbrasil.com/weather?key=${CLIENT_API_KEY}&city_name=${city}`);
    return response.json();
};

const server = http.createServer(async (req, res) => {

    // Configuração dos cabeçalhos CORS
    res.setHeader('Access-Control-Allow-Origin', '*');

    const { city } = URL.parse(req.url, true).query;

    if (!city)
        return res.end(JSON.stringify({error: "no city specified!"}));

    const data = await getWeatherCity(city);

    res.end(JSON.stringify(data));

});

server.listen(port, console.log(`API is running on port: ${port}`));