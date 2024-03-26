const {result_promise, insertTable, obtieneDatos} = require('../config/MysqlConnection-config');


exports.listarCategories = async () => {
    return await obtieneDatos({
        'table': 'categorias',
        'campo': 'estado',
        'valor': 1,
        'lista_campos': ['cod_categoria', 'categoria'],
        'str_adicional': 'ORDER BY cod_categoria desc'
    })
}