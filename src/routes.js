import express from "express";

import { PerfilController } from './controllers/PerfilController.js';
import { ProdutoController } from './controllers/ProdutoController.js';
import { DestaqueController } from './controllers/DestaqueController.js';


const routes = express.Router();

routes.get('/perfils', PerfilController.findAll);
routes.get('/perfils/:id', PerfilController.findByPk);
routes.post('/perfils', PerfilController.create);
routes.put('/perfils/:id', PerfilController.update);
routes.delete('/perfils/:id', PerfilController.delete);

routes.get('/produtos', ProdutoController.findAll);
routes.get('/produtos/:id', ProdutoController.findByPk);
routes.post('/produtos', ProdutoController.create);
routes.put('/produtos/:id', ProdutoController.update);
routes.delete('/produtos/:id', ProdutoController.delete);
routes.get('/produtos/findByFornecedor/:id', ProdutoController.findByFornecedor);

routes.get('/destaques', DestaqueController.findAll);
routes.get('/destaques/:id', DestaqueController.findByPk);
routes.post('/destaques', DestaqueController.create);
routes.put('/destaques/:id', DestaqueController.update);
routes.delete('/destaques/:id', DestaqueController.delete);

export default routes;