import {
  FacebookRounded,
  Instagram,
  Language,
  Telegram,
  LinkedIn,
  Twitter,
  GitHub,
} from '@mui/icons-material';

export interface Trait {
  name: string;
  label: string;
  icon: JSX.Element;
  type?: string;
  placeholder?: string;
  baseURL?: string;
}

export const PROFILE_TRAITS: Trait[] = [
  {
    name: 'site',
    label: 'Site',
    type: 'url',
    placeholder: 'https://site.com',
    icon: <Language color="primary" />,
  },
  {
    name: 'twitter',
    label: 'Twitter',
    placeholder: 'username',
    icon: <Twitter color="primary" />,
    baseURL: 'https://twitter.com/',
  },
  {
    name: 'telegram',
    label: 'Telegram',
    placeholder: 'username',
    icon: <Telegram color="primary" />,
    baseURL: 'https://t.me/',
  },
  {
    name: 'facebook',
    label: 'Facebook',
    placeholder: 'username',
    icon: <FacebookRounded color="primary" />,
    baseURL: 'https://facebook.com/',
  },
  {
    name: 'instagram',
    label: 'Instagram',
    placeholder: 'username',
    icon: <Instagram color="primary" />,
    baseURL: 'https://instagram.com/',
  },
  {
    name: 'github',
    label: 'GitHub',
    placeholder: 'username',
    icon: <GitHub color="primary" />,
    baseURL: 'https://github.com/',
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'username',
    icon: <LinkedIn color="primary" />,
    baseURL: 'https://linkedin.com/in/',
  },
  // {
  //   name: 'isEmailNotificationsEnabled',
  //   label: 'Is Email Notifications Enabled',
  // },
];

export default PROFILE_TRAITS;
