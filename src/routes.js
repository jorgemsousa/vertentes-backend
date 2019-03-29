const express = require('express');
const authMiddlewares = require('../src/middlewares/auth');

const routes = express.Router();

const newsletterController = require('./controllers/newsletterController');
const contactController = require('./controllers/contactController');
const userController = require('./controllers/userController');
const authController = require('./controllers//authController');



routes.get('/newsletters', newsletterController.index);
routes.post('/newsletters', newsletterController.store);

routes.get('/contacts', contactController.index);
routes.post('/contacts', contactController.store);
routes.delete('/contacts/:id', contactController.destroy);

routes.post('/authenticate', authController.index);

routes.use(authMiddlewares);
routes.get('/users', userController.index);
routes.post('/users', userController.store);
routes.delete('/users/:id', userController.destroy);
routes.put('/users/:id', userController.update);



module.exports = routes;