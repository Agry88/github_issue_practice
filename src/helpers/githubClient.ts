import { Label } from '@/types/issue';

type UpdateIssueProps = {
  title?: string;
  body?: string;
  label?: [Label];
  state?: 'open' | 'closed';
};

export default function GithubClient(token: string) {
  const repoIssuesUrl = 'https://api.github.com/repos/Agry88/github_issue_practice/issues';
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

  const deleteAllIssueLabel = async (issueId: number): Promise<Response> => {
    try {
      const response = await fetch(`${repoIssuesUrl}/${issueId}/labels`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting issue label');
    }
  };

  const addIssueLabel = async (issueId: number, label: Label): Promise<Response> => {
    try {
      const response = await fetch(`${repoIssuesUrl}/${issueId}/labels`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          labels: [label],
        }),
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Error adding issue label');
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
      const response = await fetch(`${repoIssuesUrl}/${issueId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...updateBody,
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
    deleteAllIssueLabel,
    addIssueLabel,
    closeIssue,
    updateIssue,
  };
}
