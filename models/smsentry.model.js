var mongoose = require('mongoose');
// Uso do pacote mongoosePaginate para facilitar a paginação
var mongoosePaginate = require('mongoose-paginate');

var SMSSchema = new mongoose.Schema
({
    protocolo: { type: String, unique: true },
    mensagem: { type: String },
    numeros: { type: [String], default: undefined },
    data: { type: String }
});

// Middleware para tratamento de erros de chaves duplicadas
// Esse middleware permite apenas transformar o erro, para deixá-lo mais legível
SMSSchema.post('save', function(error, doc, next)
{
    if(error.name === 'MongoError' && error.code === 11000)
    {
        next(new Error('Houve um erro de chave duplicada'));
    }
});

SMSSchema.plugin(mongoosePaginate);
const SMSEntry = mongoose.model('SMSEntry', SMSSchema);

module.exports = SMSEntry;