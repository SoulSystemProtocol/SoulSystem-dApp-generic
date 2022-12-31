import {
  FacebookRounded,
  Instagram,
  Language,
  Telegram,
  LinkedIn,
  Twitter,
  GitHub,
  InsertLink,
} from '@mui/icons-material';

export interface Trait {
  label: string;
  icon: JSX.Element;
  type?: string;
  placeholder?: string;
  baseURL?: string;
}

export const GAME_PROFILE_TRAITS: string[] = [
  'github',
  'twitter',
  'instagram',
  'website',
];
export const USER_PROFILE_TRAITS: string[] = [
  'twitter',
  'telegram',
  'facebook',
  'instagram',
  'github',
  'linkedin',
  'devpost',
  'website',
];
export const PROFILE_TRAITS: { [key: string]: Trait } = {
  twitter: {
    label: 'Twitter',
    placeholder: 'hashtag',
    icon: <Twitter color="primary" />,
    baseURL: 'https://twitter.com/',
  },
  telegram: {
    label: 'Telegram',
    placeholder: 'username',
    icon: <Telegram color="primary" />,
    baseURL: 'https://t.me/',
  },
  facebook: {
    label: 'Facebook',
    placeholder: 'username',
    icon: <FacebookRounded color="primary" />,
    baseURL: 'https://facebook.com/',
  },
  instagram: {
    label: 'Instagram',
    placeholder: 'username',
    icon: <Instagram color="primary" />,
    baseURL: 'https://instagram.com/',
  },
  github: {
    label: 'GitHub',
    placeholder: 'username',
    icon: <GitHub color="primary" />,
    baseURL: 'https://github.com/',
  },
  linkedin: {
    label: 'LinkedIn',
    placeholder: 'username',
    icon: <LinkedIn color="primary" />,
    baseURL: 'https://linkedin.com/in/',
  },
  devpost: {
    label: 'Devpost',
    placeholder: 'username',
    icon: <InsertLink color="primary" />,
    baseURL: 'https://devpost.com/',
  },
  website: {
    label: 'Webite',
    type: 'url',
    placeholder: 'example.com',
    icon: <Language color="primary" />,
  },
  // {
  //   name: 'isEmailNotificationsEnabled',
  //   label: 'Is Email Notifications Enabled',
  // },
};
