import { Issue } from '@/types/issue';
import { useEffect, useState } from 'react';

async function getListIssue(): Promise<Issue[]> {
  const response = await fetch('https://api.github.com/repos/Agry88/github_issue_practice/issues');
  const data = await response.json();

  const issueList: Issue[] = data.map((issue: any) => {
    if (issue.labels.length === 0) return null;
    return {
      issueId: issue.id,
      title: issue.title,
      body: issue.body,
      tag: {
        tagId: issue.labels[0].id,
        tagName: issue.labels[0].name,
        tagColor: issue.labels[0].color,
      },
      creatorId: issue.user.id,
      creatorName: issue.user.login,
      creatorAvatar: issue.user.avatar_url,
    };
  });

  return issueList;
}

export default function useIssue() {
  const [issueList, setIssueList] = useState<Issue[]>([]);

  useEffect(() => {
    getListIssue().then((issueListData: Issue[]) => {
      const filteredIssueListData = issueListData.filter((issue: Issue) => issue !== null);
      setIssueList(filteredIssueListData);
    });
  }, []);

  return {
    issueList,
  };
}
