const express = require('express')
const app = express()
app.use(express.json()) // Permite enviar uma requisição do tipo JSON

const informacoes = [
    {id: 7, diasemana: "segunda-feira", dataavd: "16/04/2021", disciplina: "Poo", horario: "19:00", professor: "Luiz Cláudio"},
    {id: 10, diasemana: "terça-feira", dataavd: "20/04/2021", disciplina: "Matemática", horario: "20:30", professor: "Venício"},
]



// Rodar no terminal a mensagem 
app.use((request, response, next) => {
    console.log('Primeira AVD de POO')
    return next()
})

// Listar todas as datas das provas. 
app.get('/informacoes', (request, response) => {
    return response.json(informacoes)
})
//  Middleware Irá verificar se algum dos campos não for enviado
const informacoesVerificar = (request, response, next) => {
    if (!request.body.diasemana || !request.body.dataavd || !request.body.disciplina || !request.body.professor) {
        return response
            .status(400)
            .json({ Error: 'O campo dia da semana ou data da avd ou disciplina ou horário ou professor não existe no corpo da requisição'})
    }
    return next () 
}

//  Middleware Irá Verificar se o ID existe ou não 
const idExiste = (request, response, next) => {
    const {id} = request.params
        if (!informacoes[id]) {
            return response
                .status(400)
                .json({error: "indice do funcionário inexistente"})
        }
        return next ()
}

//  Verificar se existe data da prova com esse ID
const idExisteProva = (request, response, next) => {
    const {id} = request.params
        if (!informacoes[id]) {
            return response
                .status(400)
                .json({error: "Não existe data da prova com este íd."})
        }
        return next ()
}

// 

// Crie uma rota para listar a data de prova pelo id. Se o id não existir deverá retornar a mensagem: Não existe data da prova com este id. //
app.get('/informacoes/:id', idExiste, (request, response) => {
    const {id} = request.params
    return response.json(informacoes[id])
})


// Letra D) Crie uma rota para incluir a data da prova no array
app.post('/informacoes', informacoesVerificar, (request, response) => {
    const {dataavd, diasemana, disciplina, horario, professor} = request.body
    
    const informacao = { 
        dataavd,
        diasemana,
        disciplina,
        horario,
        professor
    }
    informacoes.push(informacao)
    return response.json(informacoes)
})

// Letra E
    app.put('/informacoes/:indice', informacoesVerificar, idExisteProva, (request, response) => {
        const {indice} = request.params

        const {diasemana, dataavd, disciplina, horario, professor} = request.body

        const informacao = {
            diasemana,
            dataavd,
            disciplina,
            horario,
            professor
        }
            informacoes[indice] = informacao
            return response.json(informacoes)
    })

// Letra F  
app.delete('informacoes/:id', idExisteProva, (request, response) => {
    const {id} = request.params
    informacoes.splice(id, 1)
    return response.json(informacoes)
})


// Rota
app.listen(3333, () => {
    console.log("Servidor Rodando !!")
})  