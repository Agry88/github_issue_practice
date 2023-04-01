import { Issue, Label } from '@/types/issue';
import { useEffect, useState } from 'react';

async function getListIssue(page: number, label: Label, searchText: string): Promise<Issue[]> {
  try {
    const labelString = label === 'All' ? '' : `label:"${label}"`;
    const searchString = searchText === '' ? '' : `"${searchText}" in:title,body`;
    const queryString = `repo:Agry88/github_issue_practice is:open is:issue ${labelString} ${searchString}`;
    const parameters = new URLSearchParams({
      q: queryString,
      sort: 'created',
      order: 'desc',
      per_page: '10',
      page: `${page}`,
    });
    const response = await fetch(`https://api.github.com/search/issues?${parameters}`);

    const { items } = await response.json();

    const issueList: Issue[] = items.map((issue: any) => {
      if (issue.labels.length === 0) return null;
      return {
        issueId: issue.id,
        title: issue.title,
        body: issue.body,
        label: issue.labels[0].name,
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

export default function useIssue(page: number, label: Label, searchText: string) {
  const [issueList, setIssueList] = useState<Issue[]>([]);
  const [isNoMoreIssue, setIsNoMoreIssue] = useState<boolean>(false);
  const [isError, setisError] = useState<boolean>(false);

  useEffect(() => {
    setIssueList([]);
    setIsNoMoreIssue(false);
    setisError(false);
  }, [label, searchText]);

  useEffect(() => {
    getListIssue(page, label, searchText)
      .then((issueListData: Issue[]) => {
        const filteredIssueListData = issueListData.filter((issue: Issue) => issue !== null);
        if (filteredIssueListData.length === 0) {
          setIsNoMoreIssue(true);
        }
        setIssueList((prev) => [...prev, ...filteredIssueListData]);
      })
      .catch(() => {
        setisError(true);
      });
  }, [page, label, searchText]);

  return {
    issueList,
    isNoMoreIssue,
    isError,
  };
}
