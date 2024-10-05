import { Customer } from "@prisma/client";
import CustomerRepository from "../repositories/CustomerRepository";

class CustomerService {
    async createCustomer(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
        try {
            return await CustomerRepository.create(data);
        }
        catch (err) {
            console.error(err.message)
        }
    }

    async findCustomerById(id: string): Promise<Customer | null> {
        return CustomerRepository.findById(id);
    }

    async updateCustomer(id: string, data: Partial<Omit<Customer, 'id' | 'createdAt'>>): Promise<void> {
        await CustomerRepository.update(id, data);
    }

    async deleteCustomer(id: string): Promise<void> {
        await CustomerRepository.remove(id);
    }

    async findAllCustomers(): Promise<Customer[]> {
        return await CustomerRepository.findAll();
    }
}

export default new CustomerService();