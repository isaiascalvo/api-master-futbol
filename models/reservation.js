var mongoose = require('mongoose');
var moment = require('moment');

var reservationSchema= new mongoose.Schema({
  date: { type: Date, required: true},
  sportComplex: { type: mongoose.Schema.Types.ObjectId, ref: 'sportComplex', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  field:{type: Number,required:true},
},{timestamps:true});


reservationSchema.virtual('Date').get(function () {
    return moment(this.date).format('YYYY-MM-DD, h:mm:ss a');
});

reservationSchema.set('toJSON', {getters: true, virtuals: true});
mongoose.model('reservation', reservationSchema);