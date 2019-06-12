# HealthNewsAPI
[![Build Status](https://travis-ci.org/healthnewsapi/HealthNewsAPI.svg?branch=master)](https://travis-ci.org/healthnewsapi/HealthNewsAPI)

API do Banco de dados de notícias da Sala de Situação em Saúde - FS

## Tabela de conteúdo:

  1. [Executando a aplicação](#executando-a-aplicação)
    1.1 [Docker-compose](#executando-a-aplicação-com-o-docker-compose) 
    1.2 [NodeJs / yarn](#executando-com-nodejs-e-yarn)
    1.3 [Personalizando as portas](#personalizando-as-portas)
  2. [Visão geral da API](#visão-geral-da-api)
    2.1. [Como Usar](#como-usar)
  3. [Executando os testes](#executando-os-testes)
  4. [Construído com](#construído-com)
  1. [Versionamento](#versionamento)
  1. [Autores](#autores)
  1. [Licença](#licença)

## Executando a aplicação

Há duas formas disponíveis de executar a aplicação, via docker ou usando o NodeJS com yarn:

#### Executando a aplicação com o docker-compose
Clone o repositório

```sh
git clone https://github.com/healthnewsapi/HealthNewsAPI.git
```

Navegue até a pasta do projeto

```sh
cd HealthNewsAPI
```

Execute a aplicação

```sh
docker-compose up   # no caso de erro tente como root: sudo docker-compose up
```
Pronto! A aplicação está em execução, por padrão a aplicação está disponível na porta _8080_

**[⬆ Voltar para o topo](#tabela-de-conteúdo)**

#### Executando com NodeJs e Yarn

> Para executar a aplicação você precisa de:

* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com)
* [Docker](https://www.docker.com/)

Clone o repositório

```sh
git clone https://github.com/healthnewsapi/HealthNewsAPI.git
```

Instale as dependências
```sh
yarn install
```

Inicie o ElasticSearch

```sh
docker run -p 9200:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.1.1
```

Por fim, execute a aplicação

```sh
yarn start
```
Pronto! A aplicação está em execução, por padrão a aplicação está disponível na porta _8080_

**[⬆ Voltar para o topo](#tabela-de-conteúdo)**

#### Personalizando as portas

Para executar a aplicação em uma porta diferente da padrão(_8080_), basta configurar a variável de ambiente SERVER_PORT_API:

```sh
export SERVER_PORT_API=8001
# Agora a aplicação vai estar disponível na porta 8001
```

Por padrão a aplicação espera que o elasticSearch esteja disponível na porta _9200_, para alterar este cenário basta configurar a variável de ambiente URL_DB_NEWS:

```sh
export URL_DB_NEWS="http://localhost:9005"
# Agora a aplicação vai procurar pelo ElasticSearch nesta URL
```

## Visão geral da API

A API trabalha com o formato JSON, recomendamos o uso do header `Content-Type: application/json`

### Como Usar


#### **Rotas:**

_Listar notícias:_
```javascript
GET /noticias
```

_Buscar notícia por ID:_

```javascript
GET /noticias/ID
```

_Inserir uma nova notícia:_

```javascript
POST /noticias

// O body da requisição deve conter o documento JSON a ser inserido
{
  "author": "Nome do autor",
  "content": "Esta é uma notícia sobre saúde...",
  "description": "Descrição da notícia",
  "event": [
    "dengue",
    "chuva",
  ],
  "publishedAt": "2019-06-07T17:32:28Z",
  "insertionDate": "2018-11-19",
  "score": 6.1,
  "source": "Nome do site da noticia",
  "title": "Titulo da noticia",
  "country": "BR",
  "region": "Centro-oeste",
  "uf": "DF",
  "url": "sitedanoticia.com/noticia1",
  "urlToImage": "sitedanoticia.com/noticia1/image.jpg"
}
```

_Substituir uma notícia:_

```javascript
PUT /noticias/ID

// O body da requisição deve conter o NOVO documento JSON a ser inserido no ID indicado
// Neste metódo toda a notícia é substituida. 
// Para alterar apenas os campos da notícia USE O MÉTODO PATCH
{
  "author": "Novo nome do autor",
  "content": "Esta é uma nova notícia sobre saúde...",
  "description": "Nova descrição da notícia",
  "event": [
    "Novo evento",
  ],
  "publishedAt": "2018-06-08T17:32:28Z",
  "insertionDate": "2019-02-03",
  "score": 6.3,
  "source": "Novo nome do site da noticia",
  "title": "Novo titulo da noticia",
  "country": "BR",
  "region": "Sul",
  "uf": "PR",
  "url": "novositedanoticia.com/noticia1",
  "urlToImage": "novositedanoticia.com/noticia1/image.jpg",
}
```

_Modificar um ou mais campos de uma notícia:_

```javascript
PATCH /noticias/{ID}

// O body da requisição deve conter o(s) campo(s) e o dado a ser modificado
{
    "source": "Nova Fonte da noticia",
    "event": ["estresse"]
}
```

_Deletar uma notícia:_

```javascript
DELETE /noticias/ID
```

**[⬆ Voltar para o topo](#tabela-de-conteúdo)**

## Executando os testes

Inicie um container com ElasticSearch para testes. Usamos por padrão a porta 9001 para executar os testes

```sh
docker run -d -p 9001:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.1.1
```

Execute os testes

```sh
yarn test
```

_* Para executar os testes em outra porta ou o banco em outra url basta configurar as variáveis de ambiente:_

```sh
export SERVER_PORT_API_TEST=3002 # Porta para executar os testes

export URL_DB_NEWS_TEST="http://localhost:9005" # URL do ElasticSearch para testes
```

**[⬆ Voltar para o topo](#tabela-de-conteúdo)**

## Construído com:

* [Restify](http://restify.com/)

## Versionamento

Nós usamos [SemVer](http://semver.org/) para versionamento. Para mais versões Disponíveis, veja [Versões](https://github.com/healthnewsapi/HealthNewsAPI/tags). 

## Autores

* [Hudson dos Santos](https://github.com/hdusantos)
* [Ingrid Lorraine](https://github.com/lorrainesilva)
* [João Victor](https://github.com/joao-victor-silva)


## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

**[⬆ Voltar para o topo](#tabela-de-conteúdo)**
