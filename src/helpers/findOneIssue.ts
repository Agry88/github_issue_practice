import { Issue } from '@/types/issue';

export default async function fineOneIssue(
  issueNumber: number,
): Promise<Issue> {
  try {
    const response = await fetch(`https://api.github.com/repos/Agry88/github_issue_practice/issues/${issueNumber}`);
    const data = await response.json();
    const issue: Issue = {
      issueId: data.number,
      title: data.title,
      body: data.body,
      label: data.labels[0].name,
      creatorId: data.user.id,
      creatorName: data.user.login,
      creatorAvatar: data.user.avatar_url,
    };
    return issue;
  } catch (error) {
    console.error(error);
    throw new Error('Error while fetching issue');
  }
}
