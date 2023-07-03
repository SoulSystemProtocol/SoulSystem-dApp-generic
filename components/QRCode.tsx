import Image from 'next/image';
import { SxProps } from '@mui/material';

/**
 * QR Code
 */
export default function QRCOde({
  payload,
  height = 150,
  width = 150,
}: {
  payload: string;
  height: number;
  width: number;
}): JSX.Element {
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=${height}x${width}&data=${encodeURIComponent(payload)}`;
console.warn("[DEV] API URI", src);
  return (<Image src={src} alt="QRCode" height={height} width={width} />);
}
