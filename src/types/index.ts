export interface DiaDeNovena {
  dia: number;
  titulo: string;
  oracao: string;
  meditacao: string;
  escritura: string;
}

export interface Novena {
  id: string;
  slug: string;
  nome: string;
  santoSlug: string;
  mes: number;
  inicioMes: number;
  inicioDia: number;
  fimMes: number;
  fimDia: number;
  descricao: string;
  intencoes: string[];
  oracaoInicial: string;
  oracaoFinal: string;
  dias: DiaDeNovena[];
}

export interface Santo {
  id: number;
  slug: string;
  nome: string;
  titulo: string;
  descricao: string;
  festaDia: string;
  nascimento: string | null;
  morte: string | null;
  patronoDe: string[];
  oracao: string;
  categorias: string[];
  imagemUrl: string | null;
}

export interface ApiResponse<T> {
  sucesso: boolean;
  dados: T;
  total?: number;
  pagina?: number;
  porPagina?: number;
}

export interface ApiErro {
  sucesso: false;
  erro: string;
  codigo: number;
}

export interface CalendarioItem {
  mes: number;
  novenas: NovenaResumo[];
}

export interface NovenaResumo {
  id: string;
  slug: string;
  nome: string;
  santoSlug: string;
  mes: number;
  inicioDia: number;
  inicioMes: number;
  fimDia: number;
  fimMes: number;
  descricao: string;
  intencoes: string[];
  totalDias: number;
}
