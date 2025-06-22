import { BaseRepository } from './base.repository';
import { Job, Interviewer, Candidate } from '../entities/types';
import { datastore } from '../config/firebaseConfig';

export class JobRepository extends BaseRepository<Job> {
  constructor() {
    super('jobs');
  }

  async findByTitle(title: string): Promise<Job[]> {
    const query = datastore.createQuery(this.kind).filter('title', '=', title);
    const [entities] = await datastore.runQuery(query);
    return entities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as Job));
  }

  async findByLocation(location: string): Promise<Job[]> {
    const query = datastore.createQuery(this.kind).filter('location', '=', location);
    const [entities] = await datastore.runQuery(query);
    return entities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as Job));
  }

  async findById(id: string): Promise<Job | null> {
    const key = datastore.key([this.kind, datastore.int(id)]);
    const [entity] = await datastore.get(key);
    if (!entity) {
      return null;
    }
    const job = { id, ...entity } as Job;

    // Get interviewers
    const interviewersQuery = datastore.createQuery('interviewers').filter('jobId', '=', id);
    const [interviewersEntities] = await datastore.runQuery(interviewersQuery);
    const interviewers = interviewersEntities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as Interviewer));

    // Get candidates
    const candidatesQuery = datastore.createQuery('candidates').filter('jobId', '=', id);
    const [candidatesEntities] = await datastore.runQuery(candidatesQuery);
    const candidates = candidatesEntities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as Candidate));

    return {
      ...job,
      interviewers,
      candidates
    };
  }

  async findAll(): Promise<Job[]> {
    const query = datastore.createQuery(this.kind);
    const [entities] = await datastore.runQuery(query);
    const jobs = entities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as Job));

    // Get all interviewers and candidates for each job
    const jobsWithRelations = await Promise.all(jobs.map(async (job) => {
      const interviewersQuery = datastore.createQuery('interviewers').filter('jobId', '=', job.id);
      const [interviewersEntities] = await datastore.runQuery(interviewersQuery);
      const interviewers = interviewersEntities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as Interviewer));

      const candidatesQuery = datastore.createQuery('candidates').filter('jobId', '=', job.id);
      const [candidatesEntities] = await datastore.runQuery(candidatesQuery);
      const candidates = candidatesEntities.map((entity: any) => ({ id: entity[datastore.KEY].id, ...entity } as Candidate));

      return {
        ...job,
        interviewers,
        candidates
      };
    }));

    return jobsWithRelations;
  }
} 