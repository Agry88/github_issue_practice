import { User } from '@/types/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { access_token: accessToken } = req.query;

  const githubLoginResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const { name, avatar_url: avatarURL } = await githubLoginResponse.json();
  const user: User = {
    name,
    avatarURL,
  };

  res.status(200).json({ user });
}
