import Link from 'components/utils/Link';
import { nameEntity } from 'helpers/utils';

/**
 * Description by Entity Type
 */
export const GAME_DESC: any = {
  mdao:
    //`Mentor DAOs consist of a mentor and mentees that work on bounties together, as a team.`,
    // `A microDAO is a small cross-functional team of people that work, decide, and earn together.`,
    `Here you'd find organizations that supply services for projects.`,
  project: (
    <>
      {nameEntity('project', true)} post{' '}
      <Link href="/tasks/" sx={{ color: '#f8f8f8' }}>
        {nameEntity('task', true)}
      </Link>{' '}
      to produce products.
    </>
  ),
  task: `Here ${nameEntity(
    'project',
    true,
  )} post things they need done. ${nameEntity('', true)} and ${nameEntity(
    'mdao',
    true,
  )} can deliver those for a bounty.`,
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
  task: 'bounty',
};

export const PROC_STAGE_REV: any = {
  pending: 0,
  open: 1,
  decision: 2,
  action: 3,
  appeal: 4,
  execution: 5,
  closed: 6,
  cancelled: 7,
};

//--- DEPRECATE

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
