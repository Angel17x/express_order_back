
export interface GenericRepository<T> {
  findAll({}): Promise<T[]>;
  findById(id: any): Promise<T | null>;
  find(model: T): Promise<T | null>;
  create(entity: T): Promise<T>;
  updateAt(id:any, entity: T): Promise<T>;
  delete(id: any): Promise<boolean>;
}