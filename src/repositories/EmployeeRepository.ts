import { Appointment, Employee } from "@prisma/client";
import { ICRUDRepositoryDao } from "../dao/ICRUDRepositoryDao";
import prisma from "../dao/schemas/client";

class EmployeeRepository implements ICRUDRepositoryDao<Employee> {
    async create(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'> & { appointments?: Appointment[] }): Promise<Employee> {
        return await prisma.employee.create({
            data: {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
                appointments: {
                    create: data.appointments?.map(appointment => ({
                        name: appointment.name,
                        date: appointment.date,
                        status: appointment.status,
                        createdAt: appointment.createdAt ?? new Date(),
                        updatedAt: appointment.updatedAt ?? new Date(),
                        customerId: appointment.customerId,
                        employeeId: appointment.employeeId,
                    })) || [],
                }
            }
        })
    }
    async update(id: string, data: Partial<Omit<Employee, 'id' | 'updatedAt'>>): Promise<unknown> {
        return await prisma.employee.update({
            where: { id: id },
            data: {
                ...data,
                updatedAt: new Date()
            },
        });
    }
    async remove(id: string): Promise<unknown> {
        return await prisma.employee.delete({
            where: { id: id },
        });
    }
    async findById(id: string): Promise<Employee | null> {
        return await prisma.employee.findUnique({
            where: { id: id },
        });
    }

    async findAll(): Promise<Employee[]> {
        return await prisma.employee.findMany()
    }
}

export default new EmployeeRepository()