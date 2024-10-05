export interface Appoiment {
    id: string;
    customerId: string;
    serviceId: string;
    employeeId: string;
    appoimentDate: Date;
    status: 'scheduled' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt?: Date;
}