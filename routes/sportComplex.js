var mongoose = require('mongoose');
var router = require('express').Router();
var SportComplex = mongoose.model('sportComplex');
var moment = require('moment');

//var ObjectId = mongoose.Types.ObjectId;

//Alta de Complejos
router.post('/', (req, res, next) => {
    let name = req.body.name;
    let city = req.body.city;
    let address = req.body.address;
    let fields = req.body.fields;
    let description = req.body.description;
    let phone = req.body.phone;
    let qualification = 0;
    //let photos = req.body.photos;
    let email = req.body.email;
    let password = req.body.password;
    let password_confirmation = req.body.password_confirmation;
    let username = req.body.username;
    let openning= req.body.openning;//moment(req.body.openning).format('HH:mm:ss');//moment.parse(req.body.openning);
    let closing= req.body.closing;

    var sportComplex = new SportComplex({
        name: name,
        city: city,
        address: address,
        fields: fields,
        description: description,
        phone: phone,
        qualification: qualification,
        //photos: photos,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        username: username,
        openning: openning,
        closing: closing,
    });
    //sportComplex.save();
    //res.send("Sport complex had been posted \n" + sportComplex);
    sportComplex.save().then(function(us){
        res.send("Sport complex had been posted \n" + sportComplex);
    }, function(err){
        console.log(String(err));
        res.send("The sportComplex has not been registered correctly");
    })
});

//Listar todos los Complejos
router.get('/', (req, res, next) => {
    SportComplex.find({})
        .then(sportComplex => {
            if (!sportComplex) { return res.sendStatus(401); }
            return res.json({ 'sportComplex': sportComplex })
        })
        .catch(next);
        //res.send("get teams");
   
});

//Listar las revervas pendientes
router.get('/pending', (req, res, next) => { 
    Reservation.find({date:{$gt: moment().add('hour',-1)}}) //"<YYYY-mm-ddTHH:MM:ssZ>"
        .populate( 'sportComplex' )
        .populate( 'user' )
            .exec(function (err, reservations) {
                return res.json({ 'reservations': reservations })
            })                
    .catch(next);      
});

//Encontrar al complejo que inicia sesión
// esto hay que acomodarlo
router.post("/sessions", function(req, res){
    
    SportComplex.findOne({email:req.body.email, password:req.body.password},"username email",function(err,sportComplex){
        
        //req.session.user_id = sportComplex._id;
        //res.redirect("/app");

    }).then(sportComplex => {
        if (!sportComplex) { return res.sendStatus(401); }
        return res.json({ 'sportComplex': sportComplex })
    });

});

//Buscar un SporComplex por nombre de usuario y contraseña
router.post('/logSC', (req, res, next) => {
    console.log(req.body);
    SportComplex.findOne({username:req.body.username, password: req.body.password})
        .then(sportComplex => {
            //if (!sportComplex) { return res.sendStatus(401); }
            return res.json({ 'sportComplex': sportComplex })
        })
});

//Listar un Complejo
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    SportComplex.findById(id)
        .then(sportComplex => {
            if (!sportComplex) { return res.sendStatus(401); }
            return res.json({ 'sportComplex': sportComplex })
        })
});


//Modificar Complejo
router.put('/:id', (req, res, next) => {
    SportComplex.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, sportComplex) {
        if (err)
            res.send(err);
        res.json(sportComplex);
    });
    //res.send("Sport Complex updated");

});

//Baja de juego indicando el id del juego.

router.delete('/:id', (req, res, next) => {
    SportComplex.findByIdAndRemove(req.params.id, (err, sportComplex) => {
        let response = {
            message: "Sport Complex successfully deleted",
            id: sportComplex._id
        };
        res.status(200).send(response);
    });
});


module.exports = router;
