const { Router } = require('express');
const express = require('express');
const CollectController = require('./controllers/CollectController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController')

const routes = express.Router();
routes.post('/collect', CollectController.store);
routes.get('/collectToday', CollectController.indexToday);
routes.get('/collectDate/:date', CollectController.indexDate);
routes.post('/collectDate', CollectController.updateCollect);
routes.get('/collect', CollectController.index);//ColetasSelecionadas
routes.get('/collectSelected/:user', CollectController.ColetasSelecionadas);//ColetasSelecionadas

routes.post('/cadastro', UserController.store);

routes.post('/session', SessionController.create);

module.exports = routes;