// Importando o pacote moment-timezone para manipulação de fuso horário
var moment = require('moment-timezone');

/**
 * Gera uma string com caracteres aleatórios no formato XXXX-YYYY-ZZZZ para ser utilizada como protocolo
 * 
 * @return {String}
 */
exports.gerarProtocolo = function() 
{
    var caracteres = "";
    var conjunto = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var protocolo = "";

    for(var i = 0; i < 12; i++)
    {
        caracteres = caracteres + conjunto.charAt(Math.floor(Math.random() * conjunto.length));
    }

    protocolo = caracteres.substring(0, 4) + '-' + caracteres.substring(4, 8) + '-' + caracteres.substring(8);

    return protocolo;
}

/**
 * Retorna a data passada para o Horário Padrão de Brasília
 * 
 * @param {Date} data a data a ser modificada
 * 
 * @return {String} 
 */
exports.setarData = function(data)
{
    var format = 'DD/MM/YYYY HH:mm:ss Z';

    return moment(data).tz('America/Sao_Paulo').format(format);
}