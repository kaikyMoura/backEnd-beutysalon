import { Employee } from "@prisma/client";
import { ICRUDRepositoryDao } from "../dao/ICRUDRepositoryDao";
import prisma from "../dao/schemas/client";

class EmployeeRepository implements ICRUDRepositoryDao<Employee> {
    async create(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt' | 'appointments'>): Promise<Employee> {
        return await prisma.employee.create({
            data: {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
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