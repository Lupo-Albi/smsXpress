// Importando o modelo do Mongoose
var SMSEntry = require('../models/smsentry.model');
// Importando as funções JS criadas
var funcao = require('../public/javascripts/functions');

// Salvando o contexto desse módulo dentro da variável _this
_this = this;

/**
 * Cria um novo documento para ser salvo no banco de dados
 * 
 * @param {Object} sms objeto sms com os dados a serem salvos no documento
 * 
 * @return {Promise}
 */
exports.criarSMS = async function(sms)
{
    // Criando um documento a partir do modelo importado
    var newSMS = new SMSEntry
    ({
        protocolo: funcao.gerarProtocolo(),
        mensagem: sms.mensagem,
        numeros: sms.numeros,
        data: funcao.setarData(new Date())
    });

    try
    {
        // Salvando o documento criado
        var savedSMS = await newSMS.save();

        return savedSMS;
    } catch(e)
    {
        // retorna uma mensagem de erro descrevendo a razão
        throw Error("Erro ao registrar SMS.");
    }
}

/**
 * Realiza uma consulta no Banco de dados
 * 
 * @param {*} query parâmetro para a consulta a ser realizada
 * 
 * @param {Number} offset quantidade de documentos a serem ignorados
 * 
 * @param {Number} limit quantidade máxima de documentos a serem retornados
 * 
 * @return {*}
 */
exports.findSMS = async function(query, offset, limit)
{  
    // Configurando opções para o mongoose paginate
    var options = 
    { 
        offset,
        limit
    };

    // Try Catch pela promessa esperada para lidar com algum erro
    try
    {
        var dbEntry = await SMSEntry.paginate(query, options);

        // Retorna a entrada do bando de dados prometida pelo mongoose
        return dbEntry;
    } catch(e)
    {
        // Retorna uma mensagem de erro descrevendo o motivo
        throw Error('Erro ao procurar por entrada no banco de dados.')  ;
    }
}