# atividade SDM 2024/1 - Servidor CRUD

Dado o arquivo server.js (exemplo neste repositório):

~~~javascript 
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import sgbd from './sgbd.js'
import addRoutes from "./routes.js"

sgbd.init()

const app = express()
app.use(bodyParser.json())       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}))
app.use(cors())

app.get('/', (req, res) => {
    res.send('🚒 Hello World CRUD')
})

addRoutes(app)

app.listen(3000, () => {
    console.log('🔥 estou escutando na porta 3000');
})
~~~

e o exemplo de CRUD para frutas:

Arquivo: ```routes.js``` 
~~~javascript 
import frutas from "./controllers/frutas.js"

// Criar todas as rotas e cruds para as entidades
function addRoutes(app) {
    frutas(app)
}

export default addRoutes
~~~

Arquivo: ```controllers/frutas.js``` 
~~~javascript 
import sgbd from '../sgbd.js'

const route = "/frutas"
const entity = "frutas"

function frutas(app) {

    app.get(route, function (req, res) {
        console.log('alguém fez requisição GET '+route);
        res.json(sgbd.db[entity])
    })

    app.get(route+"/:id", function (req, res) {
        console.log('alguém fez requisição GET '+route+"/:id",req.params);
        res.json(sgbd.db[entity][req.params.id])
    })

    app.post(route, function (req, res) {
        console.log('alguém fez requisição POST '+route);
        console.log('conteúdo do body:', req.body);
        sgbd.db[entity][req.body.fruta] = req.body.fruta
        sgbd.write()
        res.json(sgbd.db[entity][req.body.fruta])
    })

    app.put(route+"/:id", function (req, res) {
        console.log('alguém fez requisição PUT '+route+"/:id",req.params);
        console.log('conteúdo do body:', req.body);
        sgbd.db[entity][req.params.id] = req.body.fruta
        sgbd.write()
        res.json(sgbd.db[entity][req.params.id])
    })

    app.delete(route+"/:id", function (req, res) {
        console.log('alguém fez requisição PUT '+route+"/:id",req.params);
        delete sgbd.db[entity][req.params.id]
        sgbd.write()
        res.json({})
    })


}

export default frutas
~~~

Crie um novo controlador ```controllers/filmes.js```  para que o servidor atenda um novo CRUD para filmes e altere o arquivo de rotas importando ```filmes.js``` e adicionando às rotas: 

Agora o servidor deve responder também as seguintes rotas (paths), métodos e parâmetros:

    a. GET 	/filmes
    b. POST	/filmes
    c. PUT 	/filmes/{id}
    d. DELETE /filmes/{id}

**Todas seguintes condições devem ser atendidas:**

- Todo filme deve conter a estrutura abaixo (exemplo de um filme):

~~~javascript 
    {
        "id": "filme-01",
        "nome": "O vento levou",
        "ano": 1960,
        "genero": "romance" 
    }
~~~

- Entregar o link do seu github com o projeto alterado pelo classroom: (atividade)[https://classroom.google.com/c/NjY2NDk2MTQyMjQ2/a/NjU2NDczMzAwMzIx/details]

**`DICA: clone o repositório e faça os testes direto rodando o servidor`**