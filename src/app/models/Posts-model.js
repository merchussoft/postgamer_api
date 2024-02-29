const {result_promise, insertTable, obtieneDatos} = require('../config/MysqlConnection-config');



exports.listarPosts = async (cod_post = 0) => {
    let select_adicional = '';
    let where_adicional = '';
    if(cod_post){
        where_adicional = `AND cod_news = ${cod_post}`;
        select_adicional = ' ,ubicacion_https as url_img ';
    }
    let sql = 'SELECT cod_news, title, description, content, DATE_FORMAT(ne.created_at, "%Y-%m-%d") as created_at ';
    sql += select_adicional
    sql += ' FROM news ne '
    sql += ' LEFT JOIN adjuntos ad ON ad.relacion = ne.cod_news '
    sql += ` WHERE 1=1 ${where_adicional} order by created_at desc  `
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