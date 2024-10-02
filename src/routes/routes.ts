import customerController  from '../controllers/CustomerController';
import express from 'express';

const router = express.Router()

router.get('/customers/:id', customerController.findCustomerById.bind(customerController))
router.get('/customers', customerController.findAllCustomers.bind(customerController))
router.put('/customers/:id', customerController.updateCustomer.bind(customerController))
router.delete('/customers/:id', customerController.deleteCustomer.bind(customerController))
router.post('/customers', customerController.createCustomer.bind(customerController));

export default router;