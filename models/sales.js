var mongoose = require('moongose'); //importamos la librera
var schema = mongoose.Schema; 

//creamos una variable donde guardaremos esquema con el contenido que se va a usar
var newSale = new schema({
  idSale: {type: Number, required: true, unique: true},
  idProduct: {type: Number, required: true, unique: true}, 
  vTotal: {type: Number, reuired: true},
  amount: {type: Number, requered: true},
  price: {type: Number, requered: true},
  dateV: {type: Date, requered: true},
  idClient: {type: Number, requered: true},
  nameC: {type: String, requered: true},
  nameV: {type: String, requered: true}
});

module.exports = mongoose.model("Sale", newSale);