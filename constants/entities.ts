//Post Types
export const POST_TYPE: { [key: string]: string } = {
  evidence: 'evidence',
  comment: 'comment',
  confirmation: 'confirmation',
};

// Default Task Tags
export const TASK_TAGS: string[] = [
  'Dev',
  'Design',
  'Marketing',
  'Research',
  'Writing',
  'Translation',
  'Hiring',
];

export const PROC_STAGE: string[] = [
  'Draft',
  'Open',
  'Decision',
  'Action',
  'Appeal',
  'Execution',
  'Closed',
  'Cancelled',
];

export const FORM_STATUS: any = {
  available: 1,
  ipfsUpload: 2,
  waitForChain: 3,
};
