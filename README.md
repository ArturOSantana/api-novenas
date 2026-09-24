# API de Novenas Católicas 🕊️

API REST em TypeScript/Node.js com novenas, meditações diárias e santos católicos em **Português Brasileiro**. Desenvolvida para ser consumida em qualquer projeto web, mobile ou aplicativo.

---

## ✨ Recursos

- 📖 **25+ novenas** com **9 dias completos** cada
- 🧘 **Meditação do dia** + **oração** + **versículo bíblico** em cada dia
- 📅 **Calendário anual** de novenas (organizado por mês)
- 🙏 **Endpoint `/hoje`** — retorna as novenas em andamento hoje com o dia atual automaticamente
- ⛪ **Catálogo de santos** com patronos, categorias e oração
- 🔒 CORS configurável, Rate Limiting, Helmet (segurança)
- 🇧🇷 100% em português do Brasil

---

## 🗂️ Novenas Disponíveis

| Período | Novena |
|---------|--------|
| 23/dez – 01/jan | Novena a Santa Maria Mãe de Deus |
| 08/jan – 16/jan | Novena a São José de Anchieta |
| 08/mar – 16/mar | Novena a São Patrício |
| 10/mar – 18/mar | Novena a São José |
| 04/mai – 12/mai | Novena a Nossa Senhora de Fátima |
| 13/mai – 22/mai | Novena a Santa Rita de Cássia |
| 31/mai – 12/jun | Trezena a Santo Antônio de Pádua (13 dias) |
| 15/jun – 23/jun | Novena a São João Batista |
| 17/jun – 26/jun | Novena a São Josemaría Escrivá |
| 18/jun – 26/jun | Novena a Nossa Senhora do Perpétuo Socorro |
| 07/jul – 15/jul | Novena a Nossa Senhora do Carmo |
| 22/jul – 30/jul | Novena a Santo Inácio de Loyola |
| 06/ago – 14/ago | Novena da Assunção de Nossa Senhora |
| 14/set – 22/set | Novena a São Pio de Pietrelcina |
| 03/out – 11/out | Novena a Nossa Senhora Aparecida |
| 13/out – 21/out | Novena a São João Paulo II |
| 29/nov – 07/dez | Novena da Imaculada Conceição |
| 16/dez – 24/dez | Novena de Natal de São Leão Magno |

---

## 🚀 Início Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Build de produção
npm run build && npm start
```

A API estará disponível em `http://127.0.0.1:3000`.

---

## 🔌 Endpoints

### Saúde e Info

```
GET /               → Documentação resumida dos endpoints
GET /health         → Status da API
```

---

### 📿 Novenas

#### Listar todas as novenas
```
GET /api/v1/novenas
```

**Query params opcionais:**
| Parâmetro | Tipo | Exemplo | Descrição |
|-----------|------|---------|-----------|
| `mes` | number | `?mes=5` | Filtra pelo mês de início |
| `intencao` | string | `?intencao=familia` | Filtra por intenção |
| `q` | string | `?q=jose` | Busca por nome/descrição |

**Exemplo de resposta:**
```json
{
  "sucesso": true,
  "total": 18,
  "dados": [
    {
      "id": "sao-jose-marido-de-maria",
      "slug": "novena-sao-jose",
      "nome": "Novena a São José",
      "santoSlug": "sao-jose",
      "mes": 3,
      "inicioDia": 10,
      "inicioMes": 3,
      "fimDia": 18,
      "fimMes": 3,
      "descricao": "Novena preparatória à festa de São José...",
      "intencoes": ["Família", "Trabalho", "Pais", "Igreja Universal"],
      "totalDias": 9
    }
  ]
}
```

---

#### Novenas em andamento hoje (com conteúdo do dia atual)
```
GET /api/v1/novenas/hoje
```

**Exemplo de resposta:**
```json
{
  "sucesso": true,
  "total": 1,
  "dados": [
    {
      "id": "sao-jose-marido-de-maria",
      "slug": "novena-sao-jose",
      "nome": "Novena a São José",
      "diaAtual": 3,
      "conteudoHoje": {
        "dia": 3,
        "titulo": "José, Trabalhador",
        "oracao": "São José, carpinteiro de Nazaré...",
        "meditacao": "Jesus foi chamado 'filho do carpinteiro'...",
        "escritura": "\"Não é ele o carpinteiro, o filho de Maria?\" (Mc 6,3)"
      }
    }
  ]
}
```

---

#### Calendário anual
```
GET /api/v1/novenas/calendario
```

---

#### Detalhes de uma novena completa
```
GET /api/v1/novenas/:slug
```

**Exemplo:** `GET /api/v1/novenas/novena-sao-jose`

**Resposta inclui:** todos os 9 dias com oração, meditação e versículo.

---

#### Conteúdo de um dia específico
```
GET /api/v1/novenas/:slug/dia/:dia
```

**Exemplo:** `GET /api/v1/novenas/novena-sao-jose/dia/5`

**Exemplo de resposta:**
```json
{
  "sucesso": true,
  "dados": {
    "dia": 5,
    "titulo": "José, o Silencioso",
    "oracao": "São José, cujas palavras nunca foram registradas...",
    "meditacao": "Nenhuma palavra de José foi registrada nos Evangelhos...",
    "escritura": "\"Há tempo para calar e tempo para falar.\" (Ecl 3,7)",
    "novena": "Novena a São José",
    "slug": "novena-sao-jose"
  }
}
```

---

### ⛪ Santos

#### Listar santos
```
GET /api/v1/santos
```

**Query params opcionais:**
| Parâmetro | Tipo | Exemplo |
|-----------|------|---------|
| `categoria` | string | `?categoria=familia` |
| `q` | string | `?q=antonio` |

---

#### Listar categorias disponíveis
```
GET /api/v1/santos/categorias
```

---

#### Detalhes de um santo
```
GET /api/v1/santos/:slug
```

**Exemplo:** `GET /api/v1/santos/santo-antonio`

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` (não versione este arquivo):

```env
PORT=3000
HOST=127.0.0.1
ALLOWED_ORIGINS=https://meusite.com,https://meuapp.com
```

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3000` | Porta do servidor |
| `HOST` | `127.0.0.1` | Host de escuta (não use `0.0.0.0` em produção) |
| `ALLOWED_ORIGINS` | `*` | Origens CORS permitidas (separadas por vírgula) |

---

## 🔧 Integração em outros projetos

### JavaScript/Fetch
```js
const res = await fetch('http://localhost:3000/api/v1/novenas/hoje');
const { dados } = await res.json();
console.log(dados[0].conteudoHoje.meditacao);
```

### React / Next.js
```ts
const { dados: novenas } = await fetch('/api/v1/novenas?mes=3').then(r => r.json());
```

### React Native / Expo
```ts
const API = 'https://sua-api.com';
const novena = await fetch(`${API}/api/v1/novenas/novena-sao-jose`).then(r => r.json());
```

---

## 📁 Estrutura do Projeto

```
src/
├── app.ts                  # Configuração Express (CORS, Helmet, rotas)
├── server.ts               # Entry point
├── types/
│   └── index.ts            # Interfaces TypeScript
├── controllers/
│   ├── novenasController.ts
│   └── santosController.ts
├── routes/
│   ├── novenas.ts
│   └── santos.ts
└── data/
    ├── santos.json
    └── novenas/
        ├── index.ts        # Agrega todos os meses
        ├── janeiro.json
        ├── marco.json
        ├── maio.json
        ├── junho.json
        ├── julho.json
        ├── agosto-setembro.json
        ├── outubro.json
        └── dezembro.json
```

---

## ➕ Como adicionar uma nova novena

1. Crie ou edite o arquivo JSON do mês correspondente em `src/data/novenas/`
2. Siga o schema:

```json
{
  "id": "slug-unico",
  "slug": "novena-nome-do-santo",
  "nome": "Novena a ...",
  "santoSlug": "slug-do-santo",
  "mes": 5,
  "inicioMes": 5, "inicioDia": 4,
  "fimMes": 5,    "fimDia": 12,
  "descricao": "...",
  "intencoes": ["Família", "Proteção"],
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

3. Se for um mês ainda sem arquivo, crie-o e registre no [`src/data/novenas/index.ts`](src/data/novenas/index.ts)

---

## 📜 Licença

MIT
