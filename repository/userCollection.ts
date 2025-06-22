import { datastore } from '../config/firebaseConfig';
import { User, CreateUserDTO, UpdateUserDTO } from '../entities/user';

const COLLECTION_NAME = 'users';

export class UserRepository {
  private kind = COLLECTION_NAME;

  async create(userData: CreateUserDTO): Promise<User> {
    const key = datastore.key(this.kind);
    const user: User = {
      id: key.id as string,
      email: userData.email,
      name: userData.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await datastore.save({ key, data: user });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const key = datastore.key([this.kind, datastore.int(id)]);
    const [entity] = await datastore.get(key);
    if (!entity) return null;
    return { id, ...entity } as User;
  }

  async update(id: string, userData: UpdateUserDTO): Promise<User | null> {
    const key = datastore.key([this.kind, datastore.int(id)]);
    const [entity] = await datastore.get(key);
    if (!entity) return null;
    const updatedUser = {
      ...entity,
      ...userData,
      updatedAt: new Date(),
    };
    await datastore.save({ key, data: updatedUser });
    return { id, ...updatedUser } as User;
  }

  async delete(id: string): Promise<boolean> {
    const key = datastore.key([this.kind, datastore.int(id)]);
    await datastore.delete(key);
    return true;
  }

  async findAll(): Promise<User[]> {
    const query = datastore.createQuery(this.kind);
    const [entities] = await datastore.runQuery(query);
    return entities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as User));
  }
} 