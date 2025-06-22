import { BaseRepository } from './base.repository';
import { Candidate } from '../entities/types';
import { datastore } from '../config/firebaseConfig';

export class CandidateRepository extends BaseRepository<Candidate> {
  constructor() {
    super('candidates');
  }

  async findByJobId(jobId: string): Promise<Candidate[]> {
    const query = datastore.createQuery(this.kind).filter('jobId', '=', jobId);
    const [entities] = await datastore.runQuery(query);
    return entities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as Candidate));
  }

  async findByLocation(location: string): Promise<Candidate[]> {
    const query = datastore.createQuery(this.kind).filter('location', '=', location);
    const [entities] = await datastore.runQuery(query);
    return entities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as Candidate));
  }
} 