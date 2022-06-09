var express = require('express');
var router = express.Router();
let mainController = require('../controllers/mainController.js');
const adminMiddleware = require('../middlewares/adminMiddleware');

const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });


/* GET home page. */
router.get('/capitulos', mainController.index);
router.get('/nico', mainController.listNico);
router.get('/search', mainController.search);
router.get('/query', mainController.query);
router.get('/secciones', mainController.listSeccion);
router.post('/crear-capitulo', adminMiddleware, upload.single("nota_capitulo"), mainController.crearCap);
router.post('/editar-capitulo', adminMiddleware, upload.single("nota_capitulo"), mainController.editarCap)
router.post('/select-update', adminMiddleware, mainController.selectUpdate);
router.post('/eliminar-capitulo', adminMiddleware, mainController.eliminarCapitulo)
router.post('/crear-seccion', adminMiddleware, upload.single("nota_seccion"), mainController.crearSeccion)
router.post('/editar-seccion', adminMiddleware, upload.single("nota_seccion"), mainController.editarSeccion);
router.post('/eliminar-seccion', adminMiddleware, mainController.eliminarSeccion);
router.post('/crear-nico', adminMiddleware, mainController.crearNico);
router.post('/buscar-nico', adminMiddleware, mainController.buscarNico);
router.post('/editar-nico', adminMiddleware, mainController.editarNico);
router.post('/eliminar-nico', adminMiddleware, mainController.eliminarNico);

module.exports = router;
