import { NextApiRequest, NextApiResponse } from 'next';
import GithubClient from '@/helpers/githubClient';
import { Tag } from '@/types/issue';

type Body = {
  accessToken: string;
  title: string;
  comment: string;
  label: Tag;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const {
      accessToken, title, comment, label,
    }: Body = req.body;

    if (typeof accessToken !== 'string') res.status(403).json({ status: 'error', message: 'Invalid access token' });
    if (typeof title !== 'string') res.status(403).json({ status: 'error', message: 'Invalid title' });
    if (typeof comment !== 'string' || comment.length <= 30) res.status(403).json({ status: 'error', message: 'Invalid comment' });
    if (label !== 'Open' && label !== 'In Progress' && label !== 'Closed') res.status(403).json({ status: 'error', message: 'Invalid label' });

    const { createIssue } = GithubClient(accessToken);
    const response = await createIssue(title, comment, label);
    const { status } = response;

    if (status !== 201) res.status(500).json({ status: 'error', message: 'Error creating issue' });

    res.status(201).json({ status: 'success', message: 'Issue created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server error' });
  }
}
