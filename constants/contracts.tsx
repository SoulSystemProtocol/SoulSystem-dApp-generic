import Link from 'components/utils/Link';
import { nameEntity } from 'hooks/utils';

export const GAME_DESC: any = {
  mdao: `Mentor DAOs consist of a mentor and mentees that work on bounties
  together, as a team.`,
  project: (
    <>
      Projects consume work to produce a product. Cordinating effort via{' '}
      <Link href="/tasks/" sx={{ color: '#f8f8f8' }}>
        {nameEntity('task', true)}
      </Link>
      .
    </>
  ),
  task: 'Bounties are tasks you can do for a reward.',
  dao: '',
};

export const SOUL_TYPE: any = {
  created_by_not_contract: '',
  game: 'GAME',
  process: 'PROCESS',
};

export const GAME_TYPE: any = {
  mdao: 'MDAO',
  project: 'PROJECT',
};

/* TODO: Role Token IDs aren't static/predetermind. Should fetch them from the contract directly */
export const GAME_ROLE = {
  admin: {
    id: '1',
    name: 'lead',
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
  pending: 0,
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

export const CLAIM_POST_TYPE: any = {
  message: 'message',
  application: 'application',
};

export const CLAIM_POST_ENTITY_TYPE: any = {
  applicant: 'applicant',
};

//--- DEPRECATE

export const REPUTATION_DOMAIN = {
  environment: {
    name: 'environment',
  },
  personal: {
    name: 'personal',
  },
  community: {
    name: 'community',
  },
  professional: {
    name: 'professional',
  },
};
