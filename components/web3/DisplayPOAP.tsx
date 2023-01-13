import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import useError from 'hooks/useError';
import DisplayGridItemPOAP from './DisplayGridItemPOAP';

/**
 * Component: Display POAP
 */
export default function DisplayPOAP({
  account,
  displayCount = 12,
  title,
  sx = {},
}: any): JSX.Element {
  const { handleError } = useError();
  const [items, setItems] = useState<Array<any>>([]);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  //Load POAPs
  async function getPOAP(address: string): Promise<void> {
    const options: any = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_POAP_API_KEY,
      },
    };
    try {
      const response = await fetch(
        `https://api.poap.tech/actions/scan/${address}`,
        options,
      ).then((response) => response.json());
      // console.log('POAP Res:', { account, response });
      setItems(response);
    } catch (error: any) {
      setItems([]);
      console.error('POAP Fetch Failed:', { error, address });
      handleError(
        {
          message: `POAP Fetch Failed: ${error}`,
          name: 'POAP API Failed',
        },
        true,
      );
    }
  }

  useEffect(() => {
    //Load POAP Badges
    account ? getPOAP(account) : setItems([]);
  }, [account]);

  if (!account || items?.length == 0) return <></>;
  return (
    <>
      {title}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          ...sx,
        }}
      >
        <Grid container spacing={2} sx={{ ...sx }}>
          {!items && (
            <Grid item xs={12}>
              <Typography>Loading...</Typography>
            </Grid>
          )}
          {/*items?.length === 0 && (
            <Grid key="none" item xs={12}>
              <Typography>
                No POAPs for {addressToShortAddress(account)}
              </Typography>
            </Grid>
          )*/}
          {items?.length > 0 && (
            <>
              {items.map((item: any, index: number) =>
                index >= displayCount && !isShowMore ? (
                  <></>
                ) : (
                  <DisplayGridItemPOAP
                    key={item.event.id.toString()}
                    props={{ key: item.event.id.toString(), xs: 2, md: 1 }}
                    image_url={item?.event?.image_url}
                    name={item.event.name}
                    title={`${item.event.name} - ${item.event.description}`}
                  />
                ),
              )}
              {items.length > displayCount && !isShowMore && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={() => setIsShowMore(true)}>Show All</Button>
                </Box>
              )}
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}
