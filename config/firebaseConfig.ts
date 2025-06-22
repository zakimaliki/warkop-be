import { Datastore } from '@google-cloud/datastore';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const getDatastoreOptions = () => {
  // For local development - use the service-account.json file
  const localKeyPath = path.join(__dirname, '../service-account.json');

  try {
    // Check if local file exists
    require('fs').accessSync(localKeyPath);
    return {
      projectId: process.env.FIREBASE_PROJECT_ID || 'lumbungdemo',
      keyFilename: localKeyPath,
    };
  } catch (e) {
    console.error('Local service-account.json not found:', e);
    throw new Error('No valid Google credentials found. Please check your service-account.json file.');
  }
};

export const datastore = new Datastore(getDatastoreOptions()); 