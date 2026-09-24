# api-novenas

API REST com novenas católicas em português brasileiro.

## Novenas disponíveis

| Novena | Período |
|--------|---------|
| Novena a Santa Maria Mãe de Deus | 23/dez – 01/jan |
| Novena a São José de Anchieta | 08/jan – 16/jan |
| Novena a São Patrício | 08/mar – 16/mar |
| Novena a São José | 10/mar – 18/mar |
| Novena a Nossa Senhora de Fátima | 04/mai – 12/mai |
| Novena a Santa Rita de Cássia | 13/mai – 22/mai |
| Trezena a Santo Antônio de Pádua | 31/mai – 12/jun |
| Novena a São João Batista | 15/jun – 23/jun |
| Novena a São Josemaría Escrivá | 17/jun – 26/jun |
| Novena a Nossa Senhora do Perpétuo Socorro | 18/jun – 26/jun |
| Novena a Nossa Senhora do Carmo | 07/jul – 15/jul |
| Novena a Santo Inácio de Loyola | 22/jul – 30/jul |
| Novena da Assunção de Nossa Senhora | 06/ago – 14/ago |
| Novena a São Pio de Pietrelcina | 14/set – 22/set |
| Novena a Nossa Senhora Aparecida | 03/out – 11/out |
| Novena a São João Paulo II | 13/out – 21/out |
| Novena da Imaculada Conceição | 29/nov – 07/dez |
| Novena de Natal de São Leão Magno | 16/dez – 24/dez |

## Endpoints

```
GET /api/v1/novenas               lista todas as novenas
GET /api/v1/novenas/hoje          novenas em andamento hoje com o conteúdo do dia
GET /api/v1/novenas/calendario    calendário anual
GET /api/v1/novenas/:slug         detalhes completos de uma novena (9 dias)
GET /api/v1/novenas/:slug/dia/:n  conteúdo de um dia específico

GET /api/v1/santos                lista todos os santos
GET /api/v1/santos/categorias     categorias disponíveis
GET /api/v1/santos/:slug          detalhes de um santo

GET /health                       status da API
```

Query params em `/api/v1/novenas`: `mes`, `intencao`, `q`  
Query params em `/api/v1/santos`: `categoria`, `q`

## Rodando

```bash
npm install
npm run dev        # desenvolvimento
npm run build && npm start  # produção
```

Variáveis de ambiente (`.env`):

```
PORT=3000
HOST=127.0.0.1
ALLOWED_ORIGINS=https://meusite.com
```

## Adicionando novenas

Edite o JSON do mês em `src/data/novenas/` seguindo o schema:

```json
{
  "id": "slug-unico",
  "slug": "novena-nome-do-santo",
  "nome": "Novena a ...",
  "santoSlug": "slug-do-santo",
  "inicioMes": 5, "inicioDia": 4,
  "fimMes": 5,    "fimDia": 12,
  "descricao": "...",
  "intencoes": ["Família"],
  "oracaoInicial": "...",
  "oracaoFinal": "...",
  "dias": [
    {
      "dia": 1,
      "titulo": "...",
      "oracao": "...",
      "meditacao": "...",
      "escritura": "\"Versículo.\" (Referência)"
    }
  ]
}
```

Se for um mês novo, crie o arquivo e registre em `src/data/novenas/index.ts`.

## Licença

MIT
