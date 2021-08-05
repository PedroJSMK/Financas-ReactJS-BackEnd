const Tarefa = require('./tarefa')

Tarefa.methods(['get', 'post', 'put', 'delete'])
Tarefa.updateOptions({new: true, runValidators: true})

module.exports = Tarefa