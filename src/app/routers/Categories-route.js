const {listarCategories} = require("../controllers/Categories-controller");
const route = require('express').Router();


route.get('/', listarCategories)


module.exports = route;