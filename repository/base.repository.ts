import { datastore } from '../config/firebaseConfig';
import { Key } from '@google-cloud/datastore';

export class BaseRepository<T extends { id?: string }> {
  protected kind: string;

  constructor(kind: string) {
    this.kind = kind;
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const key = datastore.key(this.kind);
    const entity = {
      key,
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    await datastore.save(entity);
    return { id: key.id as string, ...data, createdAt: entity.data.createdAt, updatedAt: entity.data.updatedAt } as unknown as T;
  }

  async findById(id: string): Promise<T | null> {
    const key = datastore.key([this.kind, datastore.int(id)]);
    const [entity] = await datastore.get(key);
    if (!entity) return null;
    return { id, ...entity } as T;
  }

  async findAll(): Promise<T[]> {
    const query = datastore.createQuery(this.kind);
    const [entities] = await datastore.runQuery(query);
    return entities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as T));
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const key = datastore.key([this.kind, datastore.int(id)]);
    const [entity] = await datastore.get(key);
    if (!entity) return null;
    const updatedEntity = {
      ...entity,
      ...data,
      updatedAt: new Date(),
    };
    await datastore.save({ key, data: updatedEntity });
    return { id, ...updatedEntity } as T;
  }

  async delete(id: string): Promise<boolean> {
    const key = datastore.key([this.kind, datastore.int(id)]);
    await datastore.delete(key);
    return true;
  }
} 