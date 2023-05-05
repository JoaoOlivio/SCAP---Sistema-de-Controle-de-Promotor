import express from "express";

import { PerfilController } from './controllers/PerfilController.js';
import { ProdutoController } from './controllers/ProdutoController.js';
import { DestaqueController } from './controllers/DestaqueController.js';

import { LojaController } from './controllers/LojaController.js'
import { UsuarioController } from "./controllers/UsuarioController.js";
import { SaidaController } from "./controllers/SaidaController.js";


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
// routes.get('/produtos/findByFornecedor/:id', ProdutoController.findByFornecedor);

routes.get('/destaques', DestaqueController.findAll);
routes.get('/destaques/:id', DestaqueController.findByPk);
routes.post('/destaques', DestaqueController.create);
routes.put('/destaques/:id', DestaqueController.update);
routes.delete('/destaques/:id', DestaqueController.delete);

//DIOGO
routes.get('/lojas', LojaController.findAll);
routes.get('/lojas/:id', LojaController.findByPk);
routes.post('/lojas', LojaController.create);
routes.put('/lojas/:id', LojaController.update);
routes.delete('/lojas/:id', LojaController.delete);

routes.get('/usuarios', UsuarioController.findAll);
routes.get('/usuarios/:id', UsuarioController.findByPk);
routes.post('/usuarios', UsuarioController.create);
routes.put('/usuarios/:id', UsuarioController.update);
routes.delete('/usuarios/:id', UsuarioController.delete);

routes.get('/saidas', SaidaController.findAll);
routes.get('/saidas/:id', SaidaController.findByPk);
routes.post('/saidas', SaidaController.create);
routes.put('/saidas/:id', SaidaController.update);
routes.delete('/saidas/:id', SaidaController.delete);
///DIOGO


export default routes;