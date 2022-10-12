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
  },
  {
    name: 'telegram',
    label: 'Telegram',
    placeholder: 'username',
    icon: <Telegram color="primary" />,
  },
  {
    name: 'facebook',
    label: 'Facebook',
    placeholder: 'username',
    icon: <FacebookRounded color="primary" />,
  },
  {
    name: 'instagram',
    label: 'Instagram',
    placeholder: 'username',
    icon: <Instagram color="primary" />,
  },
  {
    name: 'github',
    label: 'GitHub',
    placeholder: 'username',
    icon: <GitHub color="primary" />,
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'username',
    icon: <LinkedIn color="primary" />,
  },
  // {
  //   name: 'isEmailNotificationsEnabled',
  //   label: 'Is Email Notifications Enabled',
  // },
];

export default PROFILE_TRAITS;
