export type IssueTag = {
  tagId: number;
  tagName: string;
  tagColor: string;
};

export type Issue = {
  issueId: number;
  title: string;
  body: string;
  tag: IssueTag;
  creatorId: number;
  creatorName: string;
  creatorAvatar: string;
};
