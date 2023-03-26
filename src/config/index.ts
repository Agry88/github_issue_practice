const isDev = process.env.NODE_ENV === 'development';

const hostURL = isDev ? 'http://localhost:3000' : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export {
  isDev,
  hostURL,
};
