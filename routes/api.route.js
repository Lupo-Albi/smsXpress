// Importando o express
var express = require("express");
// Criando a variável para as rotas
var router = express.Router();

// Importando o módulo roteador de sms
var SMS = require('./api/sms.router');

router.use('/sms', SMS);

// Exportando esse módulo
module.exports = router;