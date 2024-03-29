const fs = require('fs');
const path = require("path");

exports.leerArchivoJson = (url_archivo_json) => {

    url_archivo_json = path.join(__dirname, '../../..',url_archivo_json);

    if (!fs.existsSync(url_archivo_json)) {
        console.log('El archivo de usuarios no existe.');
        return [];
    }

    const data = fs.readFileSync(url_archivo_json, 'utf8');
    return JSON.parse(data);
}