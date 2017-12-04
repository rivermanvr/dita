const router = require( 'express' ).Router();

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/posts', require('./posts'))
router.use('/storylines', require('./storylines'))
router.use('/locations', require('./locations'))
router.use('/replies', require('./replies'))
router.use('/allLocations', require('./allLocations'))
module.exports = router;
