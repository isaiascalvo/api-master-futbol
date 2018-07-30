var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('user');


//Crear un usuario
router.post('/', (req, res, next) => {
    let nameUsu = req.body.name;
    let lastnameUsu = req.body.lastname;
    let phoneUsu = req.body.phone;
    let emailUsu = req.body.email;
    let reputationUsu = 0;
    let passwordUsu = req.body.password;
    let password_confirmationUsu = req.body.password_confirmation;
    let usernameUsu = req.body.username;

    var user = new User({
        name: nameUsu,
        lastname: lastnameUsu,
        phone: phoneUsu,
        email: emailUsu,
        reputation: reputationUsu, 
        password: passwordUsu,
        password_confirmation: password_confirmationUsu,
        username: usernameUsu,
    });
    //Puede haber error desde acá
    user.save().then(function(us){
        res.json( user);
    }, function(err){
        console.log(String(err));
        res.send("The user has not been registered correctly");
    })
    //Hasta acá
    /*
    user.save();
    res.sendStatus(200);
    res.send("User had been posted \n" + user);
    */
});

//Listar todos los usuario
router.get('/', (req, res, next) => {
    User.find({})
        .then(users => {
            //if (!events) { return res.sendStatus(401); }
            if(!users) { return res.sendStatus(401); }
            //return res.json({ 'events': events })
            return res.json({ 'users': users });
        })
        .catch(next);
});

//Encontrar al usuario que inicia sesión
// esto hay que acomodarlo
router.post("/sessions", function(req, res){
    
    User.findOne({email:req.body.email, password:req.body.password},"username email",function(err,user){
        
        //req.session.user_id = user._id;
        //res.redirect("/app");

    }).then(user => {
        if (!user) { return res.sendStatus(401); }
        return res.json({ 'user': user })
    });

});

//Buscar un usuario por id
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    User.findById(id)
        .then(user => {
            if (!user) { return res.sendStatus(401); }
            return res.json({ 'user': user })
        })
});

//Buscar un usuario por usuario y contraseña
router.post('/log', (req, res, next) => {
    console.log(req.body);
    User.findOne({username:req.body.username, password: req.body.password})
        .then(user => {
            if (!user) { return res.sendStatus(401); }
            return res.json({ 'user': user })
        })
});

//Modificar usuario
router.put('/:id', (req, res, next) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, user) {
//o User.findOneAndUpdate(req.params.id, {$set:req.body}, { new: true }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
    //res.send("User updated");
});

//Eliminar usuario.
router.delete('/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
    let response = {
        message: "User successfully deleted",
        id: user._id
    };
    res.status(200).send(response);
    });
});

module.exports = router;