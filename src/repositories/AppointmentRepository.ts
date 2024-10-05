import { Appointment } from "@prisma/client";
import { ICRUDRepositoryDao } from "../dao/ICRUDRepositoryDao";
import prisma from "../dao/schemas/client";

class AppointmentRepository implements ICRUDRepositoryDao<Appointment> {
    async create(data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
        return await prisma.appointment.create({
            data: {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
                customerId: data.customerId,
                employeeId: data.employeeId
            }
        })
    }
    async update(id: string, data: Partial<Omit<Appointment, 'id' | 'updatedAt'>>): Promise<unknown> {
        return await prisma.appointment.update({
            where: { id: id },
            data: {
                ...data,
                updatedAt: new Date()
            },
        });
    }
    async remove(id: string): Promise<unknown> {
        return await prisma.appointment.delete({
            where: { id: id },
        });
    }
    async findById(id: string): Promise<Appointment | null> {
        return await prisma.appointment.findUnique({
            where: { id: id },
        });
    }

    async findAll(): Promise<Appointment[]> {
        return await prisma.appointment.findMany()
    }
}

export default new AppointmentRepository()