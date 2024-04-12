import sgbd from '../sgbd.js'

const route = "/filmes"
const entity = "filmes"

function filmes(app){

    function getFilmeByID(id, res){
        const filme = sgbd.db[entity].find(function (filme){
            return filme.id == id
        })

        if (!filme){
            res.status(404).send("Filme não encontrado")
            return
        }

        return filme
    }

    app.get(route, function (req, res) {
        console.log('alguém fez requisição GET '+route);
        res.json(sgbd.db[entity])
    })

    app.get(route+"/:id", function (req, res) {
        const filme = getFilmeByID(req.params.id, res)
        res.json(filme)
    })

    app.post(route, function (req, res) {

        const nome = req.body.nome
        const ano = req.body.ano
        const genero = req.body.genero

        let id = 0
        
        for (let i = 0; i < sgbd.db[entity].length; i++){
            if (sgbd.db[entity][i].id > id){
                id = sgbd.db[entity][i].id
            }
        }
        
        const filme = {
            id: id+1,
            nome: nome,
            ano: ano,
            genero: genero  
        }

        sgbd.db[entity].push(filme)
        sgbd.write()
        console.log('Alguém adicionou um novo filme: '+route,filme)
        res.json(filme)
    })

    app.put(route+"/:id", function (req, res) {
        
        const filme = getFilmeByID(req.params.id, res)
        
        const nome = req.body.nome
        const ano = req.body.ano
        const genero = req.body.genero

        filme.nome = nome
        filme.ano = ano
        filme.genero = genero
        sgbd.write()

        console.log('Alguém alterou um filme: '+route,filme)
        res.json(filme)
    })

    app.delete(route+"/:id", function (req, res) {
        const filme = getFilmeByID(req.params.id, res)
        const index = sgbd.db[entity].indexOf(filme)
        sgbd.db[entity].splice(index, 1)
        sgbd.write()
        console.log('Alguém deletou um filme: '+route,filme)
        res.json(filme)

    })

    
}           


export default filmes;