import { Label } from '@/types/issue';

export default function GithubClient(token: string) {
  const createIssue = async (title: string, body: string, label: Label): Promise<Response> => {
    try {
      const response = await fetch('https://api.github.com/repos/Agry88/github_issue_practice/issues', {
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

  return {
    createIssue,
  };
}
