const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./backend/swagger.json');
const routes = require('./backend/routes');
const app = express();
const cors =  require('cors');

mongoose.connect('mongodb+srv://bancodecurriculos:bancodecurriculos@cluster0.g4rth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(require('./backend/routes'));
app.listen(process.env.PORT || '2800')

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    //Permitir headers fora do comum
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');
    app.use(cors());
    next();
})
