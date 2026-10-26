# Receitas da Oma

## Visão geral
Projeto web de receitas com tema da tradição alemã em Mafra, Santa Catarina. A aplicação combina a identidade visual da landing page com uma estrutura pronta para CRUD de receitas, painel de indicadores e integração com MongoDB + RESTHeart em Docker.

## Estrutura do projeto

```text
Receitas-da-Oma/
├── docker-compose.yml
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── style.css
├── postman/
│   └── colecao-receitas.json
├── README.md
└── index.html
```

## Tema e API de origem
- Tema: receitas
- API pública usada como exemplo: TheMealDB
- Coleção principal no banco: receitas

## Documento JSON de exemplo

```json
{
  "nome": "Apfelstrudel",
  "categoria": "Doce",
  "pais": "Alemanha",
  "ingredientes": ["5 maçãs", "1 colher (chá) de canela", "250 g de farinha", "60 g de manteiga", "80 g de açúcar"],
  "preparo": "1. Prepare a massa...\\n\\n2. Faça o recheio...\\n\\n3. Asse até dourar.",
  "tempoPreparo": 60,
  "dificuldade": "Média",
  "nota": 4.8,
  "favorito": true,
  "comentario": "Receita clássica da família da Oma.",
  "criadoEm": "2026-10-23T14:00:00.000Z",
  "atualizadoEm": "2026-10-23T14:00:00.000Z"
}
```

## Funcionalidades implementadas
- landing page com temática alemã
- busca por texto
- busca aproximada nos nomes de todas as receitas para tolerar erros de digitação e espaços faltando
- filtro por ingrediente, inclusive com variações simples como plural e acentos
- filtros por categoria e país
- formulário para criar e editar receitas
- listagem de receitas em cards
- destaque de favoritas
- delete com confirmação
- painel com métricas e gráficos
- fotos específicas para receitas conhecidas e URL de foto opcional no formulário
- cards expansíveis para visualizar ingredientes e página própria com detalhes, ingredientes e preparo
- cadastro e edição de modo de preparo, salvo junto dos ingredientes
- integração com banco NoSQL via RESTHeart

Nos gráficos, as barras e fatias têm cores próprias. Clique em uma categoria ou país para filtrar a lista; clique em uma barra de vendas para buscar aquela receita.

## Métodos HTTP esperados
- GET: listar receitas / buscar uma receita
- POST: criar receita
- PUT: substituir toda a receita
- PATCH: atualizar apenas alguns campos (ex.: favorito)
- DELETE: remover uma receita

## Como rodar
### 1) Subir os containers
```bash
docker compose up -d
```

### 2) Acessar a aplicação
- Frontend: http://localhost:3000
- RESTHeart: http://localhost:8080
- MongoDB: localhost:27017

### 3) Criar a coleção no banco
A primeira requisição deve criar a coleção no RESTHeart.

```http
PUT http://localhost:8080/receitas
Authorization: Basic YWRtaW46c2VjcmV0
```

## Como usar a aplicação
- clique em “Importar receitas” para popular a base com dados da API pública
- use a busca e os filtros para localizar pratos
- preencha o formulário para criar ou editar receitas
- use os botões de cada card para editar ou excluir
- acompanhe o painel com os indicadores e gráficos

## Imagens e dados demonstrativos
- Os cards usam fotos associadas ao prato (por exemplo, Apfelstrudel, Schnitzel e Kartoffelsalat). Receitas importadas da TheMealDB usam a foto fornecida pela própria API.
- Ao cadastrar uma receita, pode-se informar uma URL de imagem; se não houver, o site escolhe uma imagem conhecida pelo nome do prato.
- Os números de vendas são fictícios, apenas para demonstrar o gráfico e o ranking. Não representam vendas reais.

## Observações importantes
- O ambiente foi configurado com MongoDB + RESTHeart para atender ao requisito da atividade.
- O frontend está em HTML/CSS/JS puro, conforme a proposta do projeto.
- O arquivo da coleção do Postman está em: [postman/colecao-receitas.json](C:/Users/JeanCarlosPopper/OneDrive - GREYLOGIX/Área de Trabalho/Receitas da Oma/postman/colecao-receitas.json)
- O código principal do frontend está em: [frontend/app.js](C:/Users/JeanCarlosPopper/OneDrive - GREYLOGIX/Área de Trabalho/Receitas da Oma/frontend/app.js)

## Limitação do ambiente atual
Este computador não possui o Docker daemon em execução, então a validação real dos containers não pôde ser executada aqui. O erro encontrado foi:

```bash
failed to connect to the docker API at npipe:////./pipe/docker_engine
```

Para rodar localmente no ambiente do aluno/professor, basta instalar o Docker Desktop ou Docker Engine e iniciar o serviço antes de executar:

```bash
docker compose up -d
```

## Modo local do site
Como a máquina atual não está com o Docker ativo, a interface foi ajustada para funcionar diretamente no navegador com dados locais em `localStorage`. Isso permite:
- criar receitas no próprio site
- editar receitas
- remover receitas
- visualizar gráficos falsos de receitas mais vendidas
- testar a experiência sem depender do backend
