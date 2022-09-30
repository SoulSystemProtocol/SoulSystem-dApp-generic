import { Box, Typography } from '@mui/material';
import { capitalize } from 'lodash';

/**
 * A component with rule effects.
 */
export default function RuleEffects({ rule, sx }: any): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: { xs: 'column', md: 'row' },
        ...sx,
      }}
    >
      {rule?.effects &&
        rule.effects.map((effect: any, index: number) => (
          <RuleEffect
            key={index}
            name={effect.name}
            direction={effect.direction}
            value={effect.value}
            sx={{ mb: { xs: 0.8, md: 0 }, mr: { xs: 0, md: 1 } }}
          />
        ))}
    </Box>
  );
}

/**
 * Component: Rule's effect
 */
function RuleEffect({ name, direction, value, sx }: any): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        py: 0.6,
        px: 1.4,
        borderRadius: '8px',
        backgroundColor: direction ? 'success.main' : 'danger.main',
        ...sx,
      }}
    >
      [IconChart]
      <Typography variant="body2" sx={{ color: 'primary.contrastText', ml: 1 }}>
        {capitalize(name)}
      </Typography>
      <Typography variant="body2" sx={{ color: 'primary.contrastText', ml: 1 }}>
        {direction ? `+${value}` : `-${value}`}
      </Typography>
    </Box>
  );
}
