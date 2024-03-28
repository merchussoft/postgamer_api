const {listarPosts, insertAdjuntos, insertPost, obtenerImagen} = require('../models/Posts-model');
const cfg = require('../config/Config');
const {minioSave} = require('../helpers/updateS3Minio');
const axios = require('axios');
const {sendMessageTelegramApiPhoto, sendMessageTelegramApiText} = require('../helpers/telegramSendMessage-helper');
const {discordPost} = require('../helpers/Discord-post-helper');


exports.listarPost = async (req, res) => {
    const {data, code} = await listarPosts();
    res.status(code).json(data);
}

exports.insertNews = async (req, res) => {
    const body_data = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        cod_categoria: req.body.cod_categoria,
    }

    const {data, code} = await insertPost(body_data);
    if (code === 200) {
        const data_minio = await minioSave(req.file);
        if (data_minio.code === 200) {
            const data_insert = data_minio.data;
            data_insert.relacion = data;
            data_insert.ubicacion_https = `${cfg.UrlHost(req)}/obtener_imagen/${data}`;
            await insertAdjuntos(data_insert)

            let data_send = {
                title: body_data.title,
                url_image: data_insert.ubicacion_https,
                leermas: process.env.URL_LEERMAS + `/${data}`
            }

            await discordPost(data_send);
            await sendMessageTelegramApiPhoto(data_send);
            res.status(data_minio.code).json({message: 'data guardada existosamente'});
        } else {
            await sendMessageTelegramApiText({title: body_data.title, leermas: process.env.URL_LEERMAS + `/${data}`});
            res.status(code).json({message: 'data guardada existosamente sin una imagen'});
        }
    } else {
        res.status(code).json({message: 'Validar la data del formulario'});
    }
}

exports.detailPost = async (req, res) => {
    const {data, code} = await listarPosts(Number(req.params.cod_post));
    res.status(code).json(data);
}

exports.obtenerImagen = async (req, res) => {
    try {
        const result = await obtenerImagen(Number(req.params.cod))
        if (result.data.length) {
            const image = result.data[0];
            const response = await axios.get(image.ubicacion, {responseType: 'stream'});
            res.writeHead(200, { 'Content-Type': image.extencion, 'Content-Length': response.headers['content-length'] });
            response.data.pipe(res);
        } else res.status(404).send('Imagen no encontrada.');
    } catch (error) {
        console.error('Error al obtener la imagen:', error.message);
        res.status(500).send('Error al obtener la imagen');
    }
}

exports.uploadToMinio = async (req, res) => {
    const data_minio = await minioSave(req.file);
    res.status(data_minio.code).json(data_minio.data.ubicacion);
}