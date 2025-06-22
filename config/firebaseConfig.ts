import { Datastore } from '@google-cloud/datastore';
import * as dotenv from 'dotenv';

dotenv.config();

const getDatastoreOptions = () => {
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    hasCredentials: !!process.env.GOOGLE_CREDENTIALS_JSON,
    credentialsLength: process.env.GOOGLE_CREDENTIALS_JSON?.length || 0
  });

  // Use environment variables for both production and development
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
      throw new Error('Invalid GOOGLE_CREDENTIALS_JSON format. Please check your environment variable.');
    }
  } else {
    console.error('GOOGLE_CREDENTIALS_JSON not found in environment variables');
    throw new Error('GOOGLE_CREDENTIALS_JSON environment variable is required. Please set it in your environment or .env file.');
  }
};

export const datastore = new Datastore(getDatastoreOptions()); 