import { Button, Tooltip, ButtonProps } from '@mui/material';

interface TooltipButtonInterface extends ButtonProps {
  tooltip: string | null;
}

/**
 * A Button that may be disabled or may not appear at all.
 */
export default function TooltipButton(
  props: TooltipButtonInterface,
): JSX.Element {
  return (
    <Tooltip title={props.tooltip}>
      <div>
        <Button {...props} />
      </div>
    </Tooltip>
  );
}
