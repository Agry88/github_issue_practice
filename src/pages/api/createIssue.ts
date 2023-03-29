import { NextApiRequest, NextApiResponse } from 'next';
import GithubClient from '@/helpers/githubClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { accessToken, title, comment } = req.body;

    if (typeof accessToken !== 'string') res.status(403).json({ status: 'error', message: 'Invalid access token' });
    if (typeof title !== 'string') res.status(403).json({ status: 'error', message: 'Invalid title' });
    if (typeof comment !== 'string' || comment.length <= 30) res.status(403).json({ status: 'error', message: 'Invalid comment' });

    const { createIssue } = GithubClient(accessToken);
    const response = await createIssue(title, comment);
    const { status } = response;

    if (status !== 201) res.status(500).json({ status: 'error', message: 'Error creating issue' });

    res.status(201).json({ status: 'success', message: 'Issue created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server error' });
  }
}
