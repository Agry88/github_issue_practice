import { Label } from '@/types/issue';

type UpdateIssueProps = {
  title?: string;
  body?: string;
  label?: [Label];
  state?: 'open' | 'closed';
};

export default function GithubClient(token: string) {
  const adminToken = process.env.ADMIN_ACCESS_TOKEN;
  const repoIssuesUrl = 'https://api.github.com/repos/Agry88/github_issue_practice/issues';

  const updateIssueLabelWithAdminToken = async (
    issueId: number,
    newLabel: Label,
  ): Promise<Response> => {
    try {
      const response = await fetch(`${repoIssuesUrl}/${issueId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          labels: [newLabel],
        }),
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error closing issue');
    }
  };

  const createIssue = async (title: string, body: string, label: Label): Promise<Response> => {
    try {
      const response = await fetch(repoIssuesUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          body,
          labels: [label],
        }),
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating issue');
    }
  };

  const closeIssue = async (issueId: number): Promise<Response> => {
    try {
      const response = await fetch(`${repoIssuesUrl}/${issueId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          state: 'closed',
        }),
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error closing issue');
    }
  };

  const updateIssue = async (issueId: number, updateBody: UpdateIssueProps): Promise<Response> => {
    try {
      const { label, ...remainBody } = updateBody;

      if (label) {
        await updateIssueLabelWithAdminToken(issueId, label[0]);
      }

      const response = await fetch(`${repoIssuesUrl}/${issueId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...remainBody,
        }),
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error closing issue');
    }
  };

  return {
    createIssue,
    closeIssue,
    updateIssue,
    updateIssueLabelWithAdminToken,
  };
}
