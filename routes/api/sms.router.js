// Importando o express
var express = require('express');
// Criando a variável para as rotas 
var router = express.Router();
// Trazendo o controlador SMS
var SMSController = require('../../controllers/sms.controller');

// Mapeando cada API para as funções do controlador

router.get('/:protocolo', SMSController.findSMSbyProtocol);

router.post('/', SMSController.criarSMS);

// Exportando o roteador
module.exports = router;