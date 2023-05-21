const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
    const allowedOrigins = ['http://weather-app-gab-and-gui.vercel.app', 'http://localhost:5500']; // Lista de origens permitidas

    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      // Permite a chamada da API
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.writeHead(200);
      res.end(`API response ${process.env.CLIENT_WEATHER_KEY}`);
    } else {
      // Retorna erro para origens não permitidas
      res.writeHead(403);
      res.end('Forbidden');
    }
});

server.listen(port, console.log(`API is running in port: ${port}`));