const axios = require('axios');
const {getEnvironment} = require("../config/Config");


const discordPost = async (data= {}) => {
    try {
        const message = {
            embeds: [{
                title: data.title,
                color: 0xFF5733, // Color de la barra lateral de la Card en formato decimal
                image: {
                    url: data.url_image // URL de la imagen que deseas mostrar en la Card
                },
                fields: [{ name: '', value: `[Leer mas >>>](${data.leermas})`, inline: true }]
            }]
        }

        await axios.post(getEnvironment('WEBHOOKURL_DISCORD'), message);
    } catch (e) {
        console.error('Error al enviar el mensaje:', error);
    }
}

module.exports = {
    discordPost
};