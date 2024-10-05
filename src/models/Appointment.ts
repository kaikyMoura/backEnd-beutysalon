import { AppointmentStatus } from "../enums/AppointmentStatus";

export interface Appointment {
    id: string;
    name: string
    customerId: string;
    employeeId: string;
    date: Date;
    status: AppointmentStatus;
    createdAt: Date;
    updatedAt?: Date;
}