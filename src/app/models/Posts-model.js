const {result_promise, insertTable, obtieneDatos} = require('../config/MysqlConnection-config');



exports.listarPosts = async (cod_post = 0) => {
    let select_adicional = '';
    let where_adicional = '';
    if(cod_post){
        where_adicional = `AND cod_news = ${cod_post}`;
        select_adicional = ' ,ubicacion_https as url_img ';
    }
    let sql = 'SELECT cod_news, title, description, content, DATE_FORMAT(ne.created_at, "%Y-%m-%d") as created_at, ca.categoria ';
    sql += select_adicional
    sql += ' FROM news ne '
    sql += ' INNER JOIN categorias ca ON ca.cod_categoria = ne.cod_categoria AND ca.estado=1'
    sql += ' LEFT JOIN adjuntos ad ON ad.relacion = ne.cod_news '
    sql += ` WHERE 1=1 ${where_adicional} order by cod_news desc  `
    return await result_promise(sql);
}

exports.insertPost = async (data) =>{
    return await insertTable('news', data);
}

exports.insertAdjuntos = async (data = {})  => {
    return await insertTable('adjuntos', data);
}

exports.obtenerImagen = async (cod_adjunto) =>{
    return await obtieneDatos({
        "table": `adjuntos`,
        "campo": 'relacion',
        "valor": cod_adjunto
    })
}