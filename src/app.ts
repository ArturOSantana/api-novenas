import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import novenasRouter from './routes/novenas';
import santosRouter from './routes/santos';
import { ApiErro } from './types';

const app = express();

// ─── Segurança ───────────────────────────────────────────────────────────────
app.use(helmet());

// CORS: permite qualquer origem por padrão (configure ALLOWED_ORIGINS em produção)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['*'];

app.use(
  cors({
    origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
    methods: ['GET'],
    optionsSuccessStatus: 200,
  })
);

// Rate limiting: 100 requisições por 15 min por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { sucesso: false, erro: 'Muitas requisições. Tente novamente em 15 minutos.', codigo: 429 },
});
app.use(limiter);

app.use(express.json());

// ─── Rota de health check ─────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.json({ sucesso: true, status: 'ok', versao: '1.0.0' });
});

// ─── Rota raiz com documentação resumida ─────────────────────────────────────
app.get('/', (_req: Request, res: Response) => {
  res.json({
    sucesso: true,
    mensagem: 'API de Novenas Católicas em Português Brasileiro',
    versao: 'v1',
    endpoints: {
      novenas: {
        listar: 'GET /api/v1/novenas',
        filtros: '?mes=5 | ?intencao=familia | ?q=jose',
        hoje: 'GET /api/v1/novenas/hoje',
        calendario: 'GET /api/v1/novenas/calendario',
        detalhes: 'GET /api/v1/novenas/:slug',
        dia: 'GET /api/v1/novenas/:slug/dia/:dia',
      },
      santos: {
        listar: 'GET /api/v1/santos',
        filtros: '?categoria=familia | ?q=antonio',
        categorias: 'GET /api/v1/santos/categorias',
        detalhes: 'GET /api/v1/santos/:slug',
      },
    },
  });
});

// ─── Rotas ────────────────────────────────────────────────────────────────────
app.use('/api/v1/novenas', novenasRouter);
app.use('/api/v1/santos', santosRouter);

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  const erro: ApiErro = { sucesso: false, erro: 'Rota não encontrada.', codigo: 404 };
  res.status(404).json(erro);
});

// ─── Error handler global ────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const erro: ApiErro = { sucesso: false, erro: 'Erro interno do servidor.', codigo: 500 };
  res.status(500).json(erro);
});

export default app;
