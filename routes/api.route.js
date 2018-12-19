// Importando o express
var express = require("express");
// Criando a variável para as rotas
var router = express.Router();
// Trazendo o controlador SMS
var SMSController = require('../controllers/sms.controller');

// Mapeando cada API para as funções do controlador

/* Buscar um único registro de SMS pelo protocolo */
router.get('/:protocolo', SMSController.findSMSbyProtocol);

/* Salvar um registro de SMS */
router.post('/', SMSController.criarSMS);

// Exportando esse módulo
module.exports = router;