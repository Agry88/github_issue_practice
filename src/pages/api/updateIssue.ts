import { NextApiRequest, NextApiResponse } from 'next';
import GithubClient from '@/helpers/githubClient';
import { Label } from '@/types/issue';

type Body = {
  accessToken: string;
  issueId: string;
  title: string;
  comment: string;
  label: Label;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const {
      accessToken, issueId, title, comment, label,
    }: Body = JSON.parse(req.body);

    if (typeof accessToken !== 'string') res.status(403).json({ status: 'error', message: 'Invalid access token' });
    if (typeof issueId !== 'string') res.status(403).json({ status: 'error', message: 'Invalid issueId' });
    if (typeof title !== 'string') res.status(403).json({ status: 'error', message: 'Invalid title' });
    if (typeof comment !== 'string' || comment.length <= 30) res.status(403).json({ status: 'error', message: 'Invalid comment' });
    if (label !== 'Open' && label !== 'In Progress' && label !== 'Done') res.status(403).json({ status: 'error', message: 'Invalid label' });

    const { updateIssue } = GithubClient(accessToken);
    const response = await updateIssue(Number(issueId), {
      title,
      body: comment,
      label: [label],
    });
    const { status } = response;

    if (status !== 200) res.status(500).json({ status: 'error', message: 'Error while updating issue' });

    res.status(200).json({ status: 'success', message: 'Issue update successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server error' });
  }
}
