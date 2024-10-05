import { Appointment, Customer } from "@prisma/client";
import { ICRUDRepositoryDao } from "../dao/ICRUDRepositoryDao";
import prisma from "../dao/schemas/client";

class CustomerRepository implements ICRUDRepositoryDao<Customer> {
    async create(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'appointments'> & { appointments?: Appointment[] }): Promise<Customer> {
        return await prisma.customer.create({
            data: {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
                appointments: {
                    create: data.appointments?.map(appointment => ({
                        name: appointment.name,
                        date: appointment.date,
                        status: appointment.status,
                    })) || [],
                }
            }
        })
    }
    async update(id: string, data: Partial<Omit<Customer, 'id' | 'createdAt'>> & { appointments?: Appointment[] }): Promise<unknown> {
        return await prisma.customer.update({
            where: { id: id },
            data: {
                ...data,
                updatedAt: new Date(),
                appointments: {
                    create: data.appointments?.map(appointment => ({
                        name: appointment.name,
                        date: appointment.date,
                        status: appointment.status,
                    })) || [],
                }
            },
        });
    }
    async remove(id: string): Promise<unknown> {
        return await prisma.customer.delete({
            where: { id: id },
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