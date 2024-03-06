const axios = require('axios');
const {leerArchivoJson} = require('./leerArchivoUserIdJson');
const cfg = require("../config/Config");

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(cfg.getEnvironment('BOT_TOKEN_TELEGRAM'));

const sendMessageTelegramApiPhoto = (data = {}) => {
    bot.sendPhoto(cfg.getEnvironment('CHAT_ID_BOT_TELEGRAM'), data.url_image, {
        caption: `<strong>${data.title}</strong> <a href='${data.leermas}'>Leer más >>></a>`,
        parse_mode: 'HTML'
    }).catch((error) => {
        console.error('Error al enviar el mensaje:', error);
    })
}

const sendMessageTelegramApiText = (data = {}) => {
    bot.sendMessage(cfg.getEnvironment('CHAT_ID_BOT_TELEGRAM'), `<b>${data.title}</b> \n <a href='${data.leermas}'>Leer más >></a>`, {
        parse_mode: 'HTML'
    }).catch((error) => {
        console.error('Error al enviar el mensaje:', error);
    });
}


module.exports = {
    sendMessageTelegramApiPhoto,
    sendMessageTelegramApiText
}