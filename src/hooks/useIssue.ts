import { Issue } from '@/types/issue';
import { useEffect, useState } from 'react';

async function getListIssue(page: number): Promise<Issue[]> {
  try {
    const response = await fetch(`https://api.github.com/repos/Agry88/github_issue_practice/issues?page=${page}&per_page=10`);
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
  } catch (error) {
    console.error(error);
    throw new Error('Error');
  }
}

export default function useIssue(page: number) {
  const [issueList, setIssueList] = useState<Issue[]>([]);
  const [isNoMoreIssue, setIsNoMoreIssue] = useState<boolean>(false);
  const [isError, setisError] = useState<boolean>(false);

  useEffect(() => {
    getListIssue(page)
      .then((issueListData: Issue[]) => {
        const filteredIssueListData = issueListData.filter((issue: Issue) => issue !== null);
        if (filteredIssueListData.length === 0 || filteredIssueListData.length !== 10) {
          setIsNoMoreIssue(true);
        }
        setIssueList((prev) => [...prev, ...filteredIssueListData]);
      })
      .catch(() => {
        setisError(true);
      });
  }, [page]);

  return {
    issueList,
    isNoMoreIssue,
    isError,
  };
}
