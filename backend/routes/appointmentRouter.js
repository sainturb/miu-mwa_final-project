const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { checkToken, requireCustomer } = require('../middlewares/auth');

router.post('/:property_id',checkToken, requireCustomer, appointmentController.bookAppointment);
router.patch('/:property_id/:appointment_id',checkToken, appointmentController.changeAppointment);
router.delete('/:property_id/:appointment_id',checkToken, appointmentController.cancelAppointment);
router.get('/contact-info/:property_id/:appointment_id',checkToken, appointmentController.contactInfo);
router.get('/',checkToken, appointmentController.getListAppointments);


module.exports = router;