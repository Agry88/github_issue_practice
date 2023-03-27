import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const requestToken = req.query.code;
    const clientID = process.env.GITHUB_CLIENTID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`, {
      method: 'post',
      headers: {
        accept: 'application/json',
      },
    });
    const { access_token: accessToken } = await response.json();
    res.redirect(`/redirect?acessToken=${accessToken}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server error' });
  }
}
