export type IssueTag = 'Open' | 'In progress' | 'Done';

export type Issue = {
  id: number;
  title: string;
  body: string;
  tag: IssueTag;
  creatorName: string;
  creatorAvatar: string;
};
