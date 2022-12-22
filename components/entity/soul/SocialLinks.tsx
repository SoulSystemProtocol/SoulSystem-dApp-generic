import { MailOutlineRounded } from '@mui/icons-material';
import { Stack } from '@mui/material';
import Link from 'components/utils/Link';
import { MetaAttrHelper } from 'helpers/MetaAttrHelper';
import { PROFILE_TRAITS, Trait } from './ProfileTraits';

/**
 * Social Links Display
 */
export default function SocialLinks({ soul, sx }: any): JSX.Element {
  const email = MetaAttrHelper.extractValue(
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
      {Object.keys(PROFILE_TRAITS).map((name: string) => {
        const item: Trait = PROFILE_TRAITS[name];
        const value =
          MetaAttrHelper.extractValue(soul?.metadata?.attributes, name) ||
          MetaAttrHelper.extractValue(soul?.metadata?.attributes, item.label); //Backward Compatibility
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
