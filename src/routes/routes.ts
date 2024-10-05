import customerController from '../controllers/CustomerController';
import employeeController from '../controllers/EmployeeController';
import appointmentController from '../controllers/AppointmentController';
import express from 'express';

const router = express.Router()

router.get('/customers/:id', customerController.findCustomerById.bind(customerController))
router.get('/customers', customerController.findAllCustomers.bind(customerController))
router.put('/customers/:id', customerController.updateCustomer.bind(customerController))
router.delete('/customers/:id', customerController.deleteCustomer.bind(customerController))
router.post('/customers', customerController.createCustomer.bind(customerController));

router.get('/employees/:id', employeeController.findEmployeeById.bind(employeeController))
router.get('/employees', employeeController.findAllEmployees.bind(employeeController))
router.put('/employees/:id', employeeController.updateEmployee.bind(employeeController))
router.delete('/employees/:id', employeeController.deleteEmployee.bind(employeeController))
router.post('/employees', employeeController.createEmployee.bind(employeeController));

router.get('/appointments/:id', appointmentController.findAppointmentById.bind(appointmentController))
router.get('/appointments', appointmentController.findAllAppointments.bind(appointmentController))
router.put('/appointments/:id', appointmentController.updateAppointment.bind(appointmentController))
router.delete('/appointments/:id', appointmentController.deleteAppointment.bind(appointmentController))
router.post('/appointments', appointmentController.createAppointment.bind(appointmentController));


export default router;