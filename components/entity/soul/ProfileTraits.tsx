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
  // name: string;
  label: string;
  icon: JSX.Element;
  type?: string;
  placeholder?: string;
  baseURL?: string;
}

export const PROFILE_TRAITS: { [key: string]: Trait } = {
  website: {
    // name: 'website',
    label: 'Webite',
    type: 'url',
    placeholder: 'https://example.com',
    icon: <Language color="primary" />,
  },
  twitter: {
    // name: 'twitter',
    label: 'Twitter',
    placeholder: 'username',
    icon: <Twitter color="primary" />,
    baseURL: 'https://twitter.com/',
  },
  telegram: {
    // name: 'telegram',
    label: 'Telegram',
    placeholder: 'username',
    icon: <Telegram color="primary" />,
    baseURL: 'https://t.me/',
  },
  facebook: {
    // name: 'facebook',
    label: 'Facebook',
    placeholder: 'username',
    icon: <FacebookRounded color="primary" />,
    baseURL: 'https://facebook.com/',
  },
  instagram: {
    // name: 'instagram',
    label: 'Instagram',
    placeholder: 'username',
    icon: <Instagram color="primary" />,
    baseURL: 'https://instagram.com/',
  },
  github: {
    // name: 'github',
    label: 'GitHub',
    placeholder: 'username',
    icon: <GitHub color="primary" />,
    baseURL: 'https://github.com/',
  },
  linkedin: {
    // name: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'username',
    icon: <LinkedIn color="primary" />,
    baseURL: 'https://linkedin.com/in/',
  },
  devpost: {
    // name: 'devpost',
    label: 'Devpost',
    placeholder: 'username',
    icon: <InsertLink color="primary" />,
    baseURL: 'https://devpost.com/',
  },
  // {
  //   name: 'isEmailNotificationsEnabled',
  //   label: 'Is Email Notifications Enabled',
  // },
};

export default PROFILE_TRAITS;
