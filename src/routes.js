import express from "express";

import { PerfilController } from './controllers/PerfilController.js';
import { ProdutoController } from './controllers/ProdutoController.js';
import { DestaqueController } from './controllers/DestaqueController.js';
import { AvaliacaoController } from './controllers/AvaliacaoController.js';


import { LojaController } from './controllers/LojaController.js'
import { UsuarioController } from "./controllers/UsuarioController.js";
import { SaidaController } from "./controllers/SaidaController.js";

import { FornecedorController } from "./controllers/FornecedorController.js";
import { PromotorController } from "./controllers/PromotorController.js";
import { EntradaController } from "./controllers/EntradaController.js";


const routes = express.Router();

//João
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

routes.get('/avaliacoes', AvaliacaoController.findAll);
routes.get('/avaliacoes/:id', AvaliacaoController.findByPk);
routes.post('/avaliacoes', AvaliacaoController.create);
routes.put('/avaliacoes/:id', AvaliacaoController.update);
routes.delete('/avaliacoes/:id', AvaliacaoController.delete);
routes.get('/avaliacoes/relatorio1/:inicio/:termino', AvaliacaoController.mediaAvaliacaoPorPeriodo);
routes.get('/avaliacoes/relatorio2/:id', AvaliacaoController.ranqueDeDestaque);


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
routes.post('/saidas/verificacao', SaidaController.saidaAutomatizada);
routes.get('/saidas/relatorio1/:inicio/:termino', SaidaController.horasPorPromotor);
routes.get('/saidas/relatorio2/:inicio/:termino', SaidaController.saidaNaoRealizada);

//Gabriel
routes.get('/fornecedores', FornecedorController.findAll);
routes.get('/fornecedores/:id', FornecedorController.findByPk);
routes.post('/fornecedores', FornecedorController.create);
routes.put('/fornecedores/:id', FornecedorController.update);
routes.delete('/fornecedores/:id', FornecedorController.delete);

routes.get('/promotores', PromotorController.findAll);
routes.get('/promotores/:id', PromotorController.findByPk);
routes.post('/promotores', PromotorController.create);
routes.put('/promotores/:id', PromotorController.update);
routes.delete('/promotores/:id', PromotorController.delete);

routes.get('/entradas', EntradaController.findAll);
routes.get('/entradas/:id', EntradaController.findByPk);
routes.post('/entradas', EntradaController.create);
routes.put('/entradas/:id', EntradaController.update);
routes.delete('/entradas/:id', EntradaController.delete);
routes.get('/entradas/relatorio1/:inicio/:termino', EntradaController.quantidadeDeEntradaPorPromotor);
routes.get('/entradas/relatorio2/:inicio/:termino/:promotor', EntradaController.quantidadeDeEntradaPorPromotorFindFornecedor);



export default routes;