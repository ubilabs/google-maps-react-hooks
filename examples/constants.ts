if (!process.env.GOOGLE_MAPS_API_KEY) {
  throw new Error('No GOOGLE_MAPS_API_KEY provided');
}

export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;
