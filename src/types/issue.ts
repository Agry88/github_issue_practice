export type Label = 'All' | 'Open' | 'In Progress' | 'Done';

export type Issue = {
  issueId: number;
  title: string;
  body: string;
  label: Label;
  creatorId: number;
  creatorName: string;
  creatorAvatar: string;
};
