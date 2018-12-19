var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema ({
    maxDocumentId: {type: Number},
    maxMessageId: {type: Number},
    maxContactsId: {type: Number},
    maxContactId: {type: Number}
});

module.exports = mongoose.model('Sequence', schema);