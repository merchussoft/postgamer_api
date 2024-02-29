const route = require('express').Router();

const {listarPost, obtenerImagen, insertNews, detailPost, uploadToMinio} = require('../controllers/Posts-controller');
const {upload} = require('../helpers/multer-upload-file');

route.get('/', listarPost);

route.get('/obtener_imagen/:cod', obtenerImagen);
route.post('/savenews', upload.single('imagen'), insertNews);
route.get('/detailspost/:cod_post', detailPost);
route.post('/upload_to_minio', upload.single('file_minio'), uploadToMinio);


module.exports = route;