import { MailOutlineRounded } from '@mui/icons-material';
import { Stack } from '@mui/material';
import Link from 'components/utils/Link';
import { PROFILE_TRAITS, Trait } from './ProfileTraits';
import { AttributeHelper } from 'helpers/AttributeHelper';

export default function SocialLinks({ soul, sx }: any): JSX.Element {
  const email = AttributeHelper.extractValue(
    soul?.metadata?.attributes,
    'email',
  );

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
      {/* {PROFILE_TRAITS.map((item: any, index: number) => { */}
      {Object.keys(PROFILE_TRAITS).map((name: string) => {
        const item: Trait = PROFILE_TRAITS[name];
        const value =
          AttributeHelper.extractValue(
            soul?.metadata?.attributes,
            item.label,
          ) || AttributeHelper.extractValue(soul?.metadata?.attributes, name);
        return !value ? null : (
          <Link
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
