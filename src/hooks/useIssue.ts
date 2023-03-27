import { Issue } from '@/types/issue';
import { useEffect, useState } from 'react';

async function getListIssue(): Promise<Issue[]> {
  const response = await fetch('https://api.github.com/repos/Agry88/github_issue_practice/issues');
  const data = await response.json();

  const issueList = data.map((issue: any) => ({
    id: issue.id,
    title: issue.title,
    body: issue.body,
    tag: issue.state,
    creatorName: issue.user.login,
    creatorAvatar: issue.user.avatar_url,
  }));

  return issueList;
}

export default function useIssue() {
  const [issueList, setIssueList] = useState<Issue[]>([]);

  useEffect(() => {
    getListIssue().then((issueListData: Issue[]) => {
      setIssueList(issueListData);
    });
  }, []);

  return {
    issueList,
  };
}
