// Acessa o módulo dos serviços de uma entrada de SMS
var SMSService = require('../services/smsentry.service');

// Salvando o contexto desse módulo dentro da variável _this
_this = this;

// Salva um registro de SMS
exports.criarSMS = async function(req, res, next) 
{
    // Criando o objeto sms e salvando o conteúdo do formulário nesse objeto
    var sms = 
    {
        mensagem: req.body.mensagem,
        numeros: req.body.numeros
    }
    
    try
    {
        // Chamando agora a função importada de Service passando o objeto com os valores passados no formulário
        var createdSMS = await SMSService.criarSMS(sms);
        return res.status(201).json({ status: 201, data: createdSMS, message: "SMS enviado com sucesso." });
    } catch(e)
    {
        // Retorna uma Resposta de Erro com um código de erro e uma mensagem
        return res.status(400).json({ status: 400, message: "O processo de envio do SMS falhou."});
    }
}

// Encontra um registro de SMS no Banco de Dados pelo número do Protocolo
exports.findSMSbyProtocol = async function(req, res, next)
{
    // Parâmetros (do mongoose-paginate) para consulta a ser feita 
    var offset = 0; // quantidade de documentos a serem ignorados
    var limit = 1; // quantidade máxima de documentos a serem retornados

    // Procurando na url pelo parâmetro protocolo a ser consultado e então passando para uma variável
    var protocolo = req.params.protocolo;

    try
    {
        // Chamando a função importada de Service e utilizando o campo protocolo como critério de busca
        // A variável protocolo é utilizada para buscar o protocolo correspondente a seu valor
        var dbEntry = await SMSService.findSMS({ protocolo: protocolo}, offset, limit);

        return res.status(200).json({ status: 200, data: dbEntry, message: "Protocolo corresponde a um dos registros!" });
    } catch(e)
    {
        // Retorna uma Resposta de Erro com um código e uma mensagem
        return res.status(400).json({ status: 400, message: e.message });
    }
}