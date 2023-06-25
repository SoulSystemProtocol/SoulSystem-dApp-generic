import { Box } from '@mui/material';
import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import ImageBox from 'components/utils/ImageBox';
import { resolveLink } from 'helpers/IPFS';
import Link from 'components/utils/Link';

/**
 * [WIP] Fetch Lens Protocol Profile Data
 */
export default function SoulLensProfile({
  address,
}: {
  address: string;
}): ReactElement {
  //Lens Protocol SubGraph URL
  const graphURL =
    'https://api.thegraph.com/subgraphs/name/anudit/lens-protocol';
  const [profile, setProfile] = useState<any>();

  /**
   * Run a GQL string query against the subgraph.
   */
  const runQuery = async (
    query: string,
    url: string,
    variables = {},
  ): Promise<any> => {
    try {
      const response = await axios.post(url, { query, variables });
      if (response.data.errors) {
        throw new Error(
          `Error running subgraph query: ${JSON.stringify(
            response.data.errors,
          )}`,
        );
      }
      // console.warn('[DEV] Graph Response:', { response, url, query });
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        `Failed to query subgraph: ${JSON.stringify(error.message)}`,
      );
    }
  };

  useEffect(() => {
    const query = `{
      profiles(where:{owner:"${address}"}) {
        id
        owner
        handle
        imageURI
        pubCount
        createdOn
      }
    }`;
    address &&
      runQuery(query, graphURL)
        .then((res: any) => {
          const profile = res?.profiles?.[0];
          setProfile(profile || null);
        })
        .catch((error) => {
          console.error('Error loading Lens profile');
          setProfile(null);
        });
  }, [address, graphURL]);

  if (!profile) return <></>;
  return (
    <Box>
      <Link href={`https://lenster.xyz/u/${profile.handle}`} target="_blank">
        {/* <Typography variant="caption" title={`${profile.id}`}>
          Lens Protocol
        </Typography> */}
        <ImageBox
          src={resolveLink(profile.imageURI)}
          sx={{
            height: '32px',
            width: '32px',
          }}
          title={`Lens Protocol: ${profile.handle} (${profile.pubCount} publications)`}
        />
      </Link>
    </Box>
  );
}
