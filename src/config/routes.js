const express = require('express')

module.exports = function(server) {

    const router = express.Router()
    server.use('/api', router)

    const tarefaService = require('../api/tarefa/Service')
    tarefaService.register(router, '/tarefas')
}