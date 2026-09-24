import { Router } from 'express';
import {
  listarSantos,
  buscarSantoPorSlug,
  listarCategorias,
} from '../controllers/santosController';

const router = Router();

/**
 * @route  GET /api/v1/santos
 * @desc   Lista todos os santos (com filtros: ?categoria=familia &q=jose)
 */
router.get('/', listarSantos);

/**
 * @route  GET /api/v1/santos/categorias
 * @desc   Lista todas as categorias disponíveis
 */
router.get('/categorias', listarCategorias);

/**
 * @route  GET /api/v1/santos/:slug
 * @desc   Retorna um santo pelo slug
 */
router.get('/:slug', buscarSantoPorSlug);

export default router;
