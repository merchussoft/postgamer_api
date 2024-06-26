const mysql = require('mysql');
const { MysqlConfig } = require('./Config');

const pool = mysql.createPool(MysqlConfig());



// Manejo de errores de conexión
pool.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err);
});

const result_promise = (sql='', data=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, data, (error, rows) => {
            try {
                let data_result = {code: 200, data: rows};
                if(error) data_result = {code: 406, data: {}, 'message': error.sqlMessage, 'sql': error.sql};
                resolve(data_result)
            } catch (err) {
                console.log('mirando est error ==> ', err)
                reject(err);
            }
        })
    })
}

const obtieneDatos = async (data = {}) =>{
    let campos = ('lista_campos' in data) ? data.lista_campos.toString() : '*';
    let adicional = ('str_adicional' in data) ? data.str_adicional : '';
    let campo = ('campo' in data) ? data.campo : 1;
    let valor = ('valor' in data) ? data.valor : 1;

    let sql = `SELECT ${campos} FROM ${data.table} WHERE ${campo}='${valor}' ${adicional}`;
    return await result_promise(sql);
}

/**
 * Funcion utilizada para hacer insercion de uno a uno
 * @param table
 * @param data
 * @returns {Promise<{code: (number|number|string|*), data: number}>}
 */
const insertTable = async (table = '', data = {}) => {
    let campos = Object.keys(data).toString();
    let values_insert = [];
    for(let i = 0; i < Object.keys(data).length; i ++) values_insert.push('?');
    let sql_insert = `INSERT INTO ${table}(${campos})VALUES(${values_insert.toString()})`;
    let result_insert = await result_promise(sql_insert, Object.values(data))
    let error_data = {code: result_insert.code, 'data': result_insert.data.insertId};
    if(result_insert.code === 406 ) error_data = result_insert;
    return error_data;
}



module.exports = {
    obtieneDatos,
    insertTable,
    result_promise
}

