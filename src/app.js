const express = require('express');
const app = express();
const mg = require('morgan');
const cors = require('cors');
const {createPathEnv, nodeEnv, getNumberEnv} = require('./app/config/Config');


/**
 * aqui se estableceran los settings que tenga la api
 */
require('dotenv').config({
    path: createPathEnv(nodeEnv())
})

require('./app/config/telegram-bot-config');

app.set('port', getNumberEnv('PORT_APP'));


/**
 * middleware instance
 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(mg(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());


/**
 * aqui se van importar todas las rutas
 */
app.use('/api/post', require('./app/routers/post-route'));
app.use('/api/categories', require('./app/routers/Categories-route'));


module.exports = app;