import { Datastore } from '@google-cloud/datastore';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const datastore = new Datastore({
  projectId: process.env.FIREBASE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, '../service-account.json'),
}); 