import { BaseRepository } from './base.repository';
import { Interviewer } from '../entities/types';
import { datastore } from '../config/firebaseConfig';

export class InterviewerRepository extends BaseRepository<Interviewer> {
  constructor() {
    super('interviewers');
  }

  async findByJobId(jobId: string): Promise<Interviewer[]> {
    const query = datastore.createQuery(this.kind).filter('jobId', '=', jobId);
    const [entities] = await datastore.runQuery(query);
    return entities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as Interviewer));
  }

  async findByDepartment(department: string): Promise<Interviewer[]> {
    const query = datastore.createQuery(this.kind).filter('department', '=', department);
    const [entities] = await datastore.runQuery(query);
    return entities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as Interviewer));
  }
} 