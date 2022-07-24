export const SOUL_TYPE: any = {
  created_by_not_contract: '',
  game: 'GAME',
};

export const GAME_TYPE: any = {
  mdao: 'MDAO',
  project: 'PROJECT',
};

/* TODO: Role Token IDs aren't static/predetermind. Should fetch them from the contract directly */
export const GAME_ROLE: any = {
  admin: {
    id: '1',
    name: 'admin',
  },
  member: {
    id: '2',
    name: 'member',
  },
  authority: {
    id: '3',
    name: 'authority',
  },
  applicant: {
    id: '4',
    name: 'applicant',
  },
};

export const CLAIM_STAGE: any = {
  draft: 0,
  open: 1,
  decision: 2,
  action: 3,
  appeal: 4,
  execution: 5,
  closed: 6,
  cancelled: 7,
};

export const CLAIM_ROLE: any = {
  admin: {
    id: '1',
    name: 'admin',
  },
  subject: {
    id: '3',
    name: 'subject',
  },
  applicant: {
    id: '5',
    name: 'applicant',
  },
};

export const CLAIM_POST_ENTITY_TYPE: any = {
  applicant: 'applicant',
};
