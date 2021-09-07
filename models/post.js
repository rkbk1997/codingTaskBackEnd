var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Userschema = new Schema(
  {
    userId: { type: String, require: true },
    title: { type: String, require: true },
    desc: { type: String },
    filePath: { type: String, require: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model('postTable', Userschema);
