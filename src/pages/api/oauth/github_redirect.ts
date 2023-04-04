import { NextApiRequest, NextApiResponse } from 'next';
import Config from '@/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const requestToken = req.query.code;
    const clientID = process.env.NEXT_PUBLIC_GITHUB_CLIENTID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
    });
    const { access_token: accessToken } = await response.json();
    res.redirect(`${Config.hostURL}/redirect?acessToken=${accessToken}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server error' });
  }
}
