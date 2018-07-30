var router = require('express').Router();

router.use('/api/user', require('./user'));
router.use('/api/sportComplex', require('./sportComplex'));
router.use('/api/reservation', require('./reservation'));

module.exports=router;
