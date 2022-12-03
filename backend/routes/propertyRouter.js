const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const {checkToken, requireOwner} = require('../middlewares/auth');


router.get('/', checkToken, propertyController.getAllProperties);
router.get('/:dist/:long/:lat/findNear', checkToken, propertyController.findNear)
router.post('/', checkToken, requireOwner, propertyController.addProperty);
router.get('/:property_id', checkToken, propertyController.getPropertyById);
router.get('/owner/all', checkToken, propertyController.getPropertiesOwner);


// router.post('/:property_id/appointment',checkToken,propertyController.bookAppointment);
// router.patch('/:property_id/appointment',checkToken,propertyController.changeAppointmentByCustomer);
// router.delete('/:property_id/appointment',checkToken,propertyController.cancelAppointmentByCustomer);
// router.get('/customer/appointment',checkToken,propertyController.getListAppointmentsOfCustomer);
// router.get('/owner/appointment',checkToken,propertyController.getListAppointmentsOfOwner);

router.delete('/:property_id', checkToken, requireOwner, propertyController.deletePropertyById);
router.patch('/:property_id', checkToken, requireOwner, propertyController.updatePropertyById);


module.exports = router;