const TelegramBot = require('node-telegram-bot-api');
const {getEnvironment} = require('./Config');
const fs = require('fs');


const bot_telegram = new TelegramBot(getEnvironment('BOT_TOKEN_TELEGRAM'), {polling: true});

let filename = getEnvironment('FILENAME_JSON_USERID');
bot_telegram.on('message', (msg) => {

    const args = msg.text.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    const userId = msg.from.id;

    switch (command) {
        case 'start':
            if(!usuarioRegistrado(userId)){
                crearUsuarios(userId);
                bot_telegram.sendMessage(userId, `Recibí: hola`);
                return false;
            }
            break;
        case 'echo' || ' ' || '':
            bot_telegram.sendMessage(userId, `@${msg.chat.username}, Comando no permitido: "${command.trim()}" -- Los comando validos son los siguientes [/start]`);
            break;
    }

});


function crearUsuarios(userId) {

    if (!fs.existsSync(filename)){
        fs.writeFileSync(filename, '[]');
    }

    const data = fs.readFileSync(filename, 'utf8');
    const data_inicial = JSON.parse(data);
    data_inicial.push(userId);
    fs.writeFileSync(filename, JSON.stringify(data_inicial, null, 2));
}

function usuarioRegistrado(userId) {
    if (!fs.existsSync(filename)) {
        return false; // Si el archivo no existe, el usuario no está registrado
    }
    const data = fs.readFileSync(filename, 'utf8');
    const usuariosRegistrados = JSON.parse(data);
    return usuariosRegistrados.includes(userId);
}