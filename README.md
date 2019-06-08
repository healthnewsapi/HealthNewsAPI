# HealthNewsAPI
[![Build Status](https://travis-ci.org/healthnewsapi/HealthNewsAPI.svg?branch=master)](https://travis-ci.org/healthnewsapi/HealthNewsAPI)

API do Banco de dados de notícias da Sala de Situação em Saúde - FS

## Pré-requisitos

> Para executar a aplicação localmente você precisa de:

* [Node.js](https://nodejs.org/)
* [Docker](https://www.docker.com/)


## Iniciando a aplicação

Há duas formas disponíveis de executar a aplicação, via docker ou usando o yarn:

##### Executando a aplicação com o docker-compose:
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

##### Executando com yarn
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

## Visão geral da API

A API trabalha com o formato JSON, recomendamos o uso do header `Content-Type: application/json`

## Como Usar


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
    "chuva"
  ],
  "publishedAt": "2017-07-21T17:32:28Z",
  "score": 6.2,
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
  "content": "Novo conteúdo da notícia",
  "description": "Nova descrição da notícia",
  "event": [ "novo evento" ],
  "publishedAt": "2018-08-22T18:43:29Z",
  "score": 6.5,
  "source": "novo nome do site da noticia",
  "title": "novo titulo da noticia",
  "country": "BR",
  "region": "nova regiao",
  "uf": "uf",
  "url": "novositedanoticia.com/noticia1",
  "urlToImage": "novositedanoticia.com/noticia1/image.jpg"
}
```

_Modificar um ou mais campos de uma notícia:_

```javascript
PATCH /noticias/{ID}

// O body da requisição deve conter o(s) campo(s) e o dado a ser modificado
{
    "source": "Nova Fonte da noticia",
    "url_to_image": "Nova url da imagem"
}
```

_Deletar uma notícia:_

```javascript
DELETE /noticias/ID
```

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
