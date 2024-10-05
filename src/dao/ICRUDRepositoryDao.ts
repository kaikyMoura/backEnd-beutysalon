export interface ICRUDRepositoryDao<T> {
    create(t: T): Promise<unknown>
    update(id: string, t: T): Promise<unknown>
    remove(id: string): Promise<unknown>
    findById(id: string): Promise<T | null>
    findAll(): Promise<T[] | []>
}