function getEnvironment(k) {
    return process.env[k];
}

function getNumberEnv(k){
    return Number(getEnvironment(k))
}

function nodeEnv() {
    return getEnvironment('NODE_ENV')?.trim() || "";
}

function createPathEnv(path){
    const arr_env = ['env'];
    if (path.length) {
        const stringToArray = path.split('.');
        arr_env.unshift(...stringToArray);
    }
    return '.' + arr_env.join('.');
}

function MysqlConfig(){
    return {
        host: getEnvironment('DB_HOST_MYSQL'),
        user: getEnvironment('DB_USER_MYSQL'),
        password: getEnvironment('DB_PASS_MYSQL'),
        database: getEnvironment('DB_NAME_MYSQL'),
        port: getNumberEnv('DB_PORT_MYSQL'),
    }
}


function validarTipoDato(valor) {
    return (typeof valor === 'number') ? Number(valor) : valor;
}

function UrlHost(req) {
    const protocolo = req.protocol;
    const host = req.get('host');
    return `${protocolo}://${host}/api/post`
}


module.exports = {
    getEnvironment,
    getNumberEnv,
    nodeEnv,
    createPathEnv,
    validarTipoDato,
    MysqlConfig,
    UrlHost
}
