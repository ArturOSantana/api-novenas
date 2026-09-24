import { Request, Response } from 'express';
import { ApiResponse, ApiErro, Santo } from '../types';
import santosDados from '../data/santos.json';

const santos = santosDados as Santo[];

export function listarSantos(req: Request, res: Response): void {
  const { categoria, q } = req.query;
  let resultado = santos;

  if (categoria) {
    const termo = String(categoria).slice(0, 100).toLowerCase();
    resultado = resultado.filter((s) =>
      s.categorias.some((c) => c.toLowerCase().includes(termo))
    );
  }

  if (q) {
    const termo = String(q).slice(0, 100).toLowerCase();
    resultado = resultado.filter(
      (s) =>
        s.nome.toLowerCase().includes(termo) ||
        s.titulo.toLowerCase().includes(termo) ||
        s.descricao.toLowerCase().includes(termo)
    );
  }

  const resposta: ApiResponse<Santo[]> = {
    sucesso: true,
    dados: resultado,
    total: resultado.length,
  };
  res.json(resposta);
}

export function buscarSantoPorSlug(req: Request, res: Response): void {
  const slug = String(req.params.slug).slice(0, 100).replace(/[^a-z0-9-]/g, '');
  const santo = santos.find((s) => s.slug === slug);

  if (!santo) {
    const erro: ApiErro = { sucesso: false, erro: 'Santo não encontrado.', codigo: 404 };
    res.status(404).json(erro);
    return;
  }

  const resposta: ApiResponse<Santo> = { sucesso: true, dados: santo };
  res.json(resposta);
}

export function listarCategorias(req: Request, res: Response): void {
  const categorias = [...new Set(santos.flatMap((s) => s.categorias))].sort();
  const resposta: ApiResponse<string[]> = {
    sucesso: true,
    dados: categorias,
    total: categorias.length,
  };
  res.json(resposta);
}
