import { Datastore } from '@google-cloud/datastore';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const getDatastoreOptions = () => {
  // For Vercel/production environments
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    try {
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
      return {
        projectId: credentials.project_id,
        credentials,
      };
    } catch (e) {
      console.error('Failed to parse GOOGLE_CREDENTIALS_JSON:', e);
      console.log('Falling back to local service-account.json file');
      // Fallback to local file
    }
  }

  // For local development or fallback
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
    throw new Error('No valid Google credentials found. Please check your environment variables or service-account.json file.');
  }
};

export const datastore = new Datastore(getDatastoreOptions()); 