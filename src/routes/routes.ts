import customerController from '../controllers/CustomerController';
import employeeController from '../controllers/EmployeeController';
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

export default router;