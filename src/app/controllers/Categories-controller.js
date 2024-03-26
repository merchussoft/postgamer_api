const {listarCategories} = require("../models/Categories-model");


exports.listarCategories = async (req, res) => {
    const {code, data} = await listarCategories();
    res.status(code).json(data)
}