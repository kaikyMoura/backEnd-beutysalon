import { Employee } from "../models/Employee";
import employeeRepository from "../repositories/EmployeeRepository";

class EmployeeService {
    async createEmployee(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> {
        return await employeeRepository.create(data);
    }

    async findEmployeeById(id: string): Promise<Employee | null> {
        return employeeRepository.findById(id);
    }

    async updateEmployee(id: string, data: Partial<Omit<Employee, 'id' | 'createdAt'>>): Promise<void> {
        await employeeRepository.update(id, data);
    }

    async deleteEmployee(id: string): Promise<void> {
        await employeeRepository.remove(id);
    }

    async findAllEmployees(): Promise<Employee[]> {
        return await employeeRepository.findAll();
    }
}

export default new EmployeeService();