import { Novena } from '../../types';

import janeiroDados from './janeiro.json';
import marcoDados from './marco.json';
import maioDados from './maio.json';
import junhoDados from './junho.json';
import julhoDados from './julho.json';
import agostoSetDados from './agosto-setembro.json';
import outubroDados from './outubro.json';
import dezembroDados from './dezembro.json';

const todasNovenas: Novena[] = [
  ...(janeiroDados as Novena[]),
  ...(marcoDados as Novena[]),
  ...(maioDados as Novena[]),
  ...(junhoDados as Novena[]),
  ...(julhoDados as Novena[]),
  ...(agostoSetDados as Novena[]),
  ...(outubroDados as Novena[]),
  ...(dezembroDados as Novena[]),
].sort((a, b) => {
  if (a.mes !== b.mes) return a.mes - b.mes;
  return a.inicioDia - b.inicioDia;
});

export default todasNovenas;
