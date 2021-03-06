var mongoose = require('mongoose');

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/,"Coloca un email válido"];

var password_validation = {
  validator: function(p){
      return this.password_confirmation == p;
  },
  message:"Las contraseñas no son iguales"
}

var userSchema= new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true},
  username: {type: String, required:true, maxlength:[50,"Username muy grande"]},
  password: {type: String, minlength:[8,"El password es muy corto"], validate: password_validation},
  phone: { type: String, required: true},
  email: {type: String, required: "El correo es obligatorio",match:email_match},
  reputation: { type: Number},
  
},{timestamps:true});

userSchema.virtual("password_confirmation").get(function(){
  return this.p_c;
}).set(function(password){
  this.p_c = password;
});

userSchema.set('toJSON', {getters: true, virtuals: true});
mongoose.model('user', userSchema);