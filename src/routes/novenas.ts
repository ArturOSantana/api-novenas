import { Router } from 'express';
import {
  listarNovenas,
  buscarNovenaPorSlug,
  buscarDiaDaNovena,
  calendarioAnual,
  novenasHoje,
  datasDoAno,
} from '../controllers/novenasController';

const router = Router();

/**
 * @route  GET /api/v1/novenas
 * @desc   Lista todas as novenas (com filtros: ?mes=5 &intencao=familia &q=jose)
 */
router.get('/', listarNovenas);

/**
 * @route  GET /api/v1/novenas/hoje
 * @desc   Retorna as novenas em andamento hoje com o conteúdo do dia atual
 */
router.get('/hoje', novenasHoje);

/**
 * @route  GET /api/v1/novenas/calendario
 * @desc   Retorna o calendário anual de novenas organizado por mês
 */
router.get('/calendario', calendarioAnual);

/**
 * @route  GET /api/v1/novenas/datas?ano=2025
 * @desc   Retorna array flat com slug, nome, inicio (ISO) e fim (ISO) de cada novena no ano informado.
 *         O parâmetro ?ano é opcional; sem ele usa o ano corrente.
 *         Novenas que cruzam a virada de ano (ex: 23/12 → 01/01) têm o fim no ano+1.
 */
router.get('/datas', datasDoAno);

/**
 * @route  GET /api/v1/novenas/:slug
 * @desc   Retorna uma novena completa (todos os 9 dias) pelo seu slug
 */
router.get('/:slug', buscarNovenaPorSlug);

/**
 * @route  GET /api/v1/novenas/:slug/dia/:dia
 * @desc   Retorna um dia específico de uma novena (oração + meditação + escritura)
 */
router.get('/:slug/dia/:dia', buscarDiaDaNovena);

export default router;
