import { NextApiRequest, NextApiResponse } from 'next';
import GithubClient from '@/helpers/githubClient';
import { Label } from '@/types/issue';

type Body = {
  accessToken: string;
  issueNumber: number;
  label: Label;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const {
      accessToken, issueNumber, label,
    }: Body = req.body;

    if (typeof accessToken !== 'string') res.status(403).json({ status: 'error', message: 'Invalid access token' });
    if (typeof issueNumber !== 'number') res.status(403).json({ status: 'error', message: 'Invalid issueNumber' });
    if (label !== 'Open' && label !== 'In Progress' && label !== 'Done') res.status(403).json({ status: 'error', message: 'Invalid label' });

    const { updateIssueLabelWithAdminToken } = GithubClient(accessToken);

    const response = await updateIssueLabelWithAdminToken(issueNumber, label);

    const { status } = response;

    if (status !== 200) res.status(500).json({ status: 'error', message: 'Error while changing issue' });

    res.status(200).json({ status: 'success', message: 'Change issue label successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
}
