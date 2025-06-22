import { Datastore } from '@google-cloud/datastore';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const getDatastoreOptions = () => {
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    hasCredentials: !!process.env.GOOGLE_CREDENTIALS_JSON,
    credentialsLength: process.env.GOOGLE_CREDENTIALS_JSON?.length || 0
  });

  // For Vercel/production environments
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    try {
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
      console.log('Using GOOGLE_CREDENTIALS_JSON from environment variable');
      return {
        projectId: credentials.project_id,
        credentials,
      };
    } catch (e) {
      console.error('Failed to parse GOOGLE_CREDENTIALS_JSON:', e);
      console.log('Falling back to local service-account.json file');
      // Fallback to local file
    }
  } else {
    console.log('GOOGLE_CREDENTIALS_JSON not found in environment variables');
  }

  // For local development or fallback
  const localKeyPath = path.join(__dirname, '../service-account.json');

  try {
    // Check if local file exists
    require('fs').accessSync(localKeyPath);
    console.log('Using local service-account.json file');
    return {
      projectId: process.env.FIREBASE_PROJECT_ID || 'lumbungdemo',
      keyFilename: localKeyPath,
    };
  } catch (e) {
    console.error('Local service-account.json not found:', e);

    // If we're in production and no credentials found, throw error
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      throw new Error('No valid Google credentials found in production. Please check your GOOGLE_CREDENTIALS_JSON environment variable.');
    }

    // For local development, provide more helpful error
    throw new Error('No valid Google credentials found. Please check your environment variables or service-account.json file.');
  }
};

export const datastore = new Datastore(getDatastoreOptions()); 