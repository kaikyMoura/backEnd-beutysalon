import { Appointment } from '@prisma/client';
import appointmentRepository from '../repositories/AppointmentRepository'


class AppointmentService {
    async createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
        return await appointmentRepository.create(data);
    }

    async findAppointmentById(id: string): Promise<Appointment | null> {
        return appointmentRepository.findById(id);
    }

    async updateAppointment(id: string, data: Partial<Omit<Appointment, 'id' | 'createdAt'>>): Promise<void> {
        await appointmentRepository.update(id, data);
    }

    async deleteAppointment(id: string): Promise<void> {
        await appointmentRepository.remove(id);
    }

    async findAllAppointments(): Promise<Appointment[]> {
        return await appointmentRepository.findAll();
    }
}

export default new AppointmentService();