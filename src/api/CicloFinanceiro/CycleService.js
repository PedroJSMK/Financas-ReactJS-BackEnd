const Cycle = require('./Cycle')
const errorHandler = require('../common/errorHandler')

Cycle.methods(['get', 'post', 'put', 'delete'])
Cycle.updateOptions({ new: true, runValidators: true })
Cycle.after('post', errorHandler).after('put', errorHandler)

Cycle.route('count', (req, res, next) => {
    Cycle.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

Cycle.route('summary', (req, res, next) => {
    Cycle.aggregate({
        $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }
    }, {
        $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } }
    }, {
        $project: { _id: 0, credit: 1, debt: 1 }
    }, (error, result) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })
})

module.exports = Cycle