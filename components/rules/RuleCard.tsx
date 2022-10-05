import { ArrowForwardIosOutlined } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import RuleEffects from 'components/rules/RuleEffects';
import { DialogContext, IDialogParams } from 'contexts/dialog';
import { useContext, useState } from 'react';
import { formatActionName } from 'utils/converters';

interface Props {
  law: any;
  isCollapseEnabled: boolean;
  isCommentsEnabled: boolean;
  sx?: any;
}

/**
 * A component with a card with law (action + rules).
 */
export default function RuleCard({
  law,
  isCollapseEnabled = false,
  isCommentsEnabled = false,
  sx,
}: Props): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Card elevation={1} sx={{ ...sx }}>
      <CardContent sx={{ p: 2.5 }}>
        {isCollapseEnabled ? (
          <>
            <Button
              variant="text"
              onClick={() => setIsCollapsed(!isCollapsed)}
              sx={{
                textAlign: 'left',
                color: 'text.primary',
              }}
              endIcon={
                <ArrowForwardIosOutlined
                  sx={{
                    transform: isCollapsed ? 'none' : 'rotate(90deg)',
                    width: 16,
                  }}
                />
              }
            >
              <LawAction law={law} />
            </Button>
            <Collapse in={!isCollapsed}>
              <LawRules
                law={law}
                isCommentsEnabled={isCommentsEnabled}
                sx={{ mt: 1 }}
              />
            </Collapse>
          </>
        ) : (
          <>
            <LawAction law={law} />
            <LawRules
              law={law}
              isCommentsEnabled={isCommentsEnabled}
              sx={{ mt: 2 }}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

function LawAction({ law }: any) {
  if (law?.action) {
    return (
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        {formatActionName(law.action)}
      </Typography>
    );
  }

  return <></>;
}

function LawRules({ law, isCommentsEnabled, sx }: any): JSX.Element {
  const { showDialog, closeDialog }: Partial<IDialogParams> =
    useContext(DialogContext);

  if (law?.rules) {
    return (
      <Stack direction="column" spacing={2} sx={{ ...sx }}>
        {law.rules.map((rule: any, index: number) => (
          <Paper key={index} variant="outlined" sx={{ p: 2 }}>
            {/* Rule details and effects */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              {/* Icon, negation, name, description */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  mr: { xs: 0, md: 4 },
                }}
              >
                {/* Icon */}
                {/* {getRuleIcon(rule, 32)} */}
                [ICON]
                <Box sx={{ ml: 1.5 }}>
                  {/* Negation, name */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    {rule?.rule?.negation && (
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          color: 'danger.primary',
                          mr: 0.5,
                        }}
                      >
                        NOT
                      </Typography>
                    )}
                    <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
                      {rule?.rule?.uriData?.name || 'None Name'}
                    </Typography>
                  </Box>
                  {/* Description */}
                  {rule?.rule?.uriData?.description && (
                    <Typography variant="body2" sx={{ mt: 0.3 }}>
                      {rule.rule.uriData.description}
                    </Typography>
                  )}
                </Box>
              </Box>
              <RuleEffects rule={rule} sx={{ mt: { xs: 2, md: 0 } }} />
            </Box>
            {/* Rule id, disabled status, button to propose edits */}
            <Box
              sx={{
                display: 'flex',
                direction: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              {/* Rule id, disabled status */}
              <Stack direction="row" spacing={1}>
                <Chip label={`ID: ${rule?.ruleId || 'None'}'`} size="small" />
                {rule?.isDisabled && (
                  <Chip label={'Obsolete'} color="primary" size="small" />
                )}
              </Stack>
            </Box>
          </Paper>
        ))}
      </Stack>
    );
  }

  return <></>;
}
