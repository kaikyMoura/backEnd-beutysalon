import { Customer } from "../model/Customer"

export interface ICustomerRepositoryDao {
    create(Customer: Customer): Promise<unknown>
    update(id: string, Customer: Customer): Promise<unknown>
    remove(id: string): Promise<unknown>
    findById(id: string): Promise<Customer | null>
    findAll(): Promise<Customer[] | []>
}