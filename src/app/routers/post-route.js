const route = require('express').Router();

route.get('/', (req, res) =>{
    res.json({'message': 'hola mundo'})
});


module.exports = route;