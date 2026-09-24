import { Request, Response } from 'express';
import { ApiResponse, ApiErro, NovenaResumo, CalendarioItem } from '../types';
import todasNovenas from '../data/novenas';

const MESES = [
  '', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

function toResumo(n: (typeof todasNovenas)[0]): NovenaResumo {
  return {
    id: n.id,
    slug: n.slug,
    nome: n.nome,
    santoSlug: n.santoSlug,
    mes: n.mes,
    inicioDia: n.inicioDia,
    inicioMes: n.inicioMes,
    fimDia: n.fimDia,
    fimMes: n.fimMes,
    descricao: n.descricao,
    intencoes: n.intencoes,
    totalDias: n.dias.length,
  };
}

export function listarNovenas(req: Request, res: Response): void {
  const { mes, intencao, q } = req.query;

  let resultado = todasNovenas;

  if (mes) {
    const mesNum = parseInt(String(mes), 10);
    if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) {
      const erro: ApiErro = { sucesso: false, erro: 'Parâmetro "mes" deve ser um número entre 1 e 12.', codigo: 400 };
      res.status(400).json(erro);
      return;
    }
    resultado = resultado.filter((n) => n.mes === mesNum);
  }

  if (intencao) {
    const termo = String(intencao).slice(0, 100).toLowerCase();
    resultado = resultado.filter((n) =>
      n.intencoes.some((i: string) => i.toLowerCase().includes(termo))
    );
  }

  if (q) {
    const termo = String(q).slice(0, 100).toLowerCase();
    resultado = resultado.filter(
      (n) =>
        n.nome.toLowerCase().includes(termo) ||
        n.descricao.toLowerCase().includes(termo) ||
        n.santoSlug.toLowerCase().includes(termo)
    );
  }

  const resposta: ApiResponse<NovenaResumo[]> = {
    sucesso: true,
    dados: resultado.map(toResumo),
    total: resultado.length,
  };
  res.json(resposta);
}

export function buscarNovenaPorSlug(req: Request, res: Response): void {
  const slug = String(req.params.slug).slice(0, 100).replace(/[^a-z0-9-]/g, '');
  const novena = todasNovenas.find((n) => n.slug === slug);

  if (!novena) {
    const erro: ApiErro = { sucesso: false, erro: 'Novena não encontrada.', codigo: 404 };
    res.status(404).json(erro);
    return;
  }

  const resposta: ApiResponse<typeof novena> = { sucesso: true, dados: novena };
  res.json(resposta);
}

export function buscarDiaDaNovena(req: Request, res: Response): void {
  const slug = String(req.params.slug).slice(0, 100).replace(/[^a-z0-9-]/g, '');
  const { dia } = req.params;
  const novena = todasNovenas.find((n) => n.slug === slug);

  if (!novena) {
    const erro: ApiErro = { sucesso: false, erro: 'Novena não encontrada.', codigo: 404 };
    res.status(404).json(erro);
    return;
  }

  const diaNum = parseInt(String(dia), 10);
  if (isNaN(diaNum) || diaNum < 1 || diaNum > novena.dias.length) {
    const erro: ApiErro = {
      sucesso: false,
      erro: `Dia inválido. Esta novena tem ${novena.dias.length} dias.`,
      codigo: 400,
    };
    res.status(400).json(erro);
    return;
  }

  const diaEncontrado = novena.dias.find((d: { dia: number }) => d.dia === diaNum);
  const resposta: ApiResponse<typeof diaEncontrado & { novena: string; slug: string }> = {
    sucesso: true,
    dados: { ...diaEncontrado!, novena: novena.nome, slug: novena.slug },
  };
  res.json(resposta);
}

export function calendarioAnual(req: Request, res: Response): void {
  const calendario: CalendarioItem[] = [];

  for (let m = 1; m <= 12; m++) {
    const novenasDoMes = todasNovenas.filter((n) => n.mes === m);
    if (novenasDoMes.length > 0) {
      calendario.push({
        mes: m,
        novenas: novenasDoMes.map(toResumo),
      });
    }
  }

  const resposta: ApiResponse<{ meses: (CalendarioItem & { nomeMes: string })[] }> = {
    sucesso: true,
    dados: {
      meses: calendario.map((c) => ({ ...c, nomeMes: MESES[c.mes] })),
    },
    total: todasNovenas.length,
  };
  res.json(resposta);
}

export function novenasHoje(req: Request, res: Response): void {
  const hoje = new Date();
  const mes = hoje.getMonth() + 1;
  const dia = hoje.getDate();

  const resultado = todasNovenas.filter((n) => {
    // Novenas que se iniciam no mês atual ou no mês anterior (para casos que cruzam meses)
    const inicioEmDias = n.inicioMes * 100 + n.inicioDia;
    const fimEmDias = n.fimMes * 100 + n.fimDia;
    const hojeEmDias = mes * 100 + dia;
    return hojeEmDias >= inicioEmDias && hojeEmDias <= fimEmDias;
  });

  const com_dia_atual = resultado.map((novena) => {
    const inicioEmDias = novena.inicioMes * 100 + novena.inicioDia;
    const hojeEmDias = mes * 100 + dia;
    const diaAtual = hojeEmDias - inicioEmDias + 1;
    const diaObj = novena.dias.find((d: { dia: number }) => d.dia === diaAtual) ?? null;
    return {
      ...toResumo(novena),
      diaAtual,
      conteudoHoje: diaObj,
    };
  });

  const resposta: ApiResponse<typeof com_dia_atual> = {
    sucesso: true,
    dados: com_dia_atual,
    total: com_dia_atual.length,
  };
  res.json(resposta);
}
