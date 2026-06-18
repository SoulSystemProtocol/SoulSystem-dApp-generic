import { create } from 'ipfs-http-client';
import { useEffect, useMemo } from 'react';

const hasInfuraCredentials = Boolean(
  process.env.NEXT_PUBLIC_INFURA_PROJECT_ID &&
  process.env.NEXT_PUBLIC_INFURA_SECRET,
);

/**
 * Hook for work with IPFS.
 */
export default function useIpfs() {
  useEffect(() => {
    if (!hasInfuraCredentials) console.error('Missing Infura API Data');
  }, []);

  // eslint-disable-next-line prettier/prettier
  const auth =
    'Basic ' +
    Buffer.from(
      process.env.NEXT_PUBLIC_INFURA_PROJECT_ID +
        ':' +
        process.env.NEXT_PUBLIC_INFURA_SECRET,
    ).toString('base64');
  const infuraClient = useMemo(
    () =>
      hasInfuraCredentials
        ? create({
            // url: process.env.NEXT_PUBLIC_INFURA_IPFS_API,
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
              authorization: auth,
            },
          })
        : null,
    [auth],
  );
  const theGraphClient = useMemo(
    () =>
      process.env.NEXT_PUBLIC_THE_GRAPH_IPFS_API
        ? create({
            url: process.env.NEXT_PUBLIC_THE_GRAPH_IPFS_API,
          })
        : null,
    [],
  );

  const uploadToIPFS = async function (content: any) {
    if (!infuraClient) throw new Error('Missing Infura API Data');

    const created = await infuraClient.add(content);
    const cid = created.path;
    const url = `ipfs://${cid}`;
    console.log('IPFS', { cid, url });
    return { cid, url };
  };

  const uploadFileToIPFS = async function (file: any) {
    return uploadToIPFS({
      path: '',
      content: file,
    });
  };

  const uploadJsonToIPFS = async function (json: any) {
    const jsonString = JSON.stringify(json);
    // Upload to the graph for usage in graph queries
    theGraphClient
      ?.add(jsonString)
      .catch((error) =>
        console.error('Failed to save file to Graph IPFS', error),
      );
    // Upload to IPFS via infura
    return uploadToIPFS(jsonString);
  };

  return { uploadToIPFS, uploadFileToIPFS, uploadJsonToIPFS };
}
