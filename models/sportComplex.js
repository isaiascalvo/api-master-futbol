var mongoose = require('mongoose');
var moment = require('moment');

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/,"Coloca un email válido"];

//Esto no se si va a funcionar haciendolo en el backend
var password_validation = {
  validator: function(p){
      return this.password_confirmation == p;
  },
  message:"Las contraseñas no son iguales"
}

var sportComplexSchema= new mongoose.Schema({
  name: { type: String, required: true },
  username: {type: String, required:true, maxlength:[50,"Username muy grande"]},
  password: {type: String, minlength:[8,"El password es muy corto"], validate: password_validation},
  email: {type: String, required: "El correo es obligatorio",match:email_match},
  city: { type: String, required: true},
  address: { type: String, required: true},
  fields:{ type: Number, required: true},
  description: { type: String, required: true},
  phone: { type: String, required: true},
  qualification: { type: Number},
  openning:{type:String, required:true},
  closing:{type:String, required:true},
  //photos:[{type:File}],
  
},{timestamps:true});

/*
sportComplexSchema.virtual('Openning').get(function () {
  return moment(this.openning).format('hh:mm');
});

sportComplexSchema.virtual('Closing').get(function () {
  return moment(this.closing).format('hh:mm');
});
*/

sportComplexSchema.virtual("password_confirmation").get(function(){
  return this.p_c;
}).set(function(password){
  this.p_c = password;
});

sportComplexSchema.set('toJSON', {getters: true, virtuals: true});
mongoose.model('sportComplex', sportComplexSchema);