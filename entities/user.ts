export interface User {
  id: string;
  email: string;
  name: string;
  role: 'job_seeker' | 'job_provider';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDTO {
  email: string;
  name: string;
  password: string;
  role: 'job_seeker' | 'job_provider';
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  role?: 'job_seeker' | 'job_provider';
} 