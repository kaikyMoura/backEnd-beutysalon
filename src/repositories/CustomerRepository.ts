import { ICustomerRepositoryDao } from "../dao/ICustomerRepositoryDao";
import prisma from "../dao/schemas/client";
import { Customer } from "../model/Customer";

class CustomerRepository implements ICustomerRepositoryDao {
    async create(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
        return await prisma.customer.create({
            data: {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
    }
    async update(id: string, data: Partial<Omit<Customer, 'id' | 'createdAt'>>): Promise<unknown> {
        return await prisma.customer.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date(),
            },
        });
    }
    async remove(id: string): Promise<unknown> {
        return await prisma.customer.delete({
            where: { id },
        });
    }
    async findById(id: string): Promise<Customer | null> {
        return await prisma.customer.findUnique({
            where: { id: id },
        });
    }

    async findAll(): Promise<Customer[]> {
        return await prisma.customer.findMany()
    }
}

export default new CustomerRepository()