import { BaseRepository } from './base.repository';
import { User } from '../entities/types';
import { datastore } from '../config/firebaseConfig';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('users');
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = datastore.createQuery(this.kind).filter('email', '=', email).limit(1);
    const [entities] = await datastore.runQuery(query);
    if (!entities || entities.length === 0) return null;
    const entity = entities[0];
    return { id: entity[datastore.KEY].id, ...entity } as User;
  }
} 