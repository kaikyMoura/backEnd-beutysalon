import { Appointment } from "./Appointment";

export interface Employee {
    id: string;
    name: string;
    email: string
    appointments?: Appointment[];
    createdAt: Date
    updatedAt?: Date
}  