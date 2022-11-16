import { MailOutlineRounded } from '@mui/icons-material';
import { Stack } from '@mui/material';
import Link from 'components/utils/Link';
import { getAttribute } from 'helpers/metadata';
import PROFILE_TRAITS from './ProfileTraits';

export default function SocialLinks({ soul, sx }: any): JSX.Element {
  const email = getAttribute(soul?.metadata?.attributes, 'email');

  return (
    <Stack key="SocialLinks" direction="row" spacing={2} sx={{ ...sx }}>
      {email && (
        <Link
          key="email"
          href={`mailto:${email}`}
          title="Email"
          target="_blank"
        >
          <MailOutlineRounded />
        </Link>
      )}
      {PROFILE_TRAITS.map((item: any, index: number) => {
        const value = getAttribute(soul?.metadata?.attributes, item.label);
        return !value ? (
          <></>
        ) : (
          <Link
            key={item.name}
            href={item.baseURL ? item.baseURL + value : value}
            title={item.label}
            target="_blank"
          >
            {item.icon}
          </Link>
        );
      })}
    </Stack>
  );
}
