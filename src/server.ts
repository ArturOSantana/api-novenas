import app from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Em produção (Railway/Render) o host deve ser '0.0.0.0'.
// Em desenvolvimento local fica '127.0.0.1' por segurança.
const HOST = process.env.HOST ?? (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`API de Novenas rodando em http://${HOST}:${PORT}`);
});
