# HealthNewsAPI

API do Banco de dados de notícias da Sala de Situação em Saúde - FS

## Pré-requisitos

> Para rodar a aplicação localmente você precisa de:

* [Node.js](https://nodejs.org/)
* [Docker](https://www.docker.com/)


## Iniciando a aplicação

Há duas formas disponíveis de executar a aplicação, via docker ou usando o npm:

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
docker-compose up
```
Pronto! A aplicação está em execução, por padrão a aplicação está disponível na porta _8080_

##### Executando com npm
Clone o repositório

```sh
git clone https://github.com/healthnewsapi/HealthNewsAPI.git
```

Instale as dependências
```sh
npm install
```

Inicie o ElasticSearch

```sh
docker run -p 9200:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.1.1
```

Por fim, execute a aplicação

```sh
npm start
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
    "content": "Conteudo",
    "country": "Pais",
    "date": "AAAA-MM-DD",
    "description": "Descricao",
    "disease": "Doenca",
    "published_at": "AAAA-MM-DD",
    "region": "Regiao",
    "score": 1.0,
    "source": "Fonte da noticia",
    "title": "Titulo",
    "url": "url da noticia",
    "url_to_image": "url da imagem"
}
```

_Substituir uma notícia:_

```javascript
PUT /noticias/ID

// O body da requisição deve conter o NOVO documento JSON a ser inserido no ID indicado
{
    "author": "Nome do autor",
    "content": "Conteudo ",
    "country": "Pais",
    "date": "AAAA-MM-DD",
    "description": "Descricao",
    "disease": "Doenca",
    "published_at": "AAAA-MM-DD",
    "region": "Regiao",
    "score": 1.0,
    "source": "Fonte da noticia",
    "title": "Titulo",
    "url": "url da noticia",
    "url_to_image": "url da imagem"
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


<!-- ## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system
 -->

## Construído com

* [Restify](http://restify.com/)

## Versionamento

Nós usamos [SemVer](http://semver.org/) para versionamento. Para mais versões Disponíveis, veja [Versões](https://github.com/healthnewsapi/HealthNewsAPI/tags). 

## Autores

* [Hudson dos Santos](https://github.com/hdusantos)
* [Ingrid Lorraine](https://github.com/lorrainesilva)
* [João Victor](https://github.com/joao-victor-silva)

## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.
