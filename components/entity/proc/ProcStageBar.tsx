import Stack from '@mui/material/Stack';
import { PROC_STAGE } from 'constants/entities';
import { SxProps, Typography, useTheme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

/**
 * Process Stage as a Progress Bar
 */
export default function ProcStageBar({
  stage,
  sx,
}: {
  stage: number;
  sx?: SxProps;
}): JSX.Element {
  const theme = useTheme();
  const emptyBG = 'gray';
  const fullBG = theme.palette.calloutBackground;

  return (
    <Typography
      variant="caption"
      sx={{
        margin: 'auto',
        overflow: 'hidden',
        fontSize: '0.75rem',
        ...sx,
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: 'inline-flex',
          overflow: 'hidden',
          background: fullBG,
          whiteSpace: 'nowrap',
          borderRadius: '12px',
          flexWrap: 'nowrap',
        }}
      >
        {PROC_STAGE.map((label: string, index: number) => {
          if (index > stage && index == PROC_STAGE.length - 1) return null;
          if (index == 4) return null;
          return (
            <span
              key={label + index}
              style={{
                backgroundColor: index > stage ? emptyBG : '',
                padding: '0 12px',
                fontSize: '0.95em',
                lineHeight: '24px',
              }}
            >
              <span>{label}</span>
              {index < PROC_STAGE.length - 2 && (
                <>
                  <ProcStageBarSep />
                  {index == stage && (
                    <ArrowForwardIosIcon
                      sx={{
                        color: emptyBG,
                        verticalAlign: 'middle',
                        my: '-80px',
                        mr: '-75px',
                        ml: '-85px',
                        fontSize: '160px',
                      }}
                    />
                  )}
                </>
              )}
            </span>
          );
        })}
      </Stack>
    </Typography>
  );
}

/**
 * Process Stage Bar Separator
 */
function ProcStageBarSep(): JSX.Element {
  const theme = useTheme();
  const sepColor = theme.palette.background.default;
  return (
    <ArrowForwardIosIcon
      sx={{
        color: sepColor,
        verticalAlign: 'middle',
        my: '-5px',
        mr: '-20px',
        ml: '-0px',
        fontSize: '34px',
      }}
    />
  );
}
