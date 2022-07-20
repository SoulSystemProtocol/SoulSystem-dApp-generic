import axios from 'axios';
import { create } from 'ipfs-http-client';

/**
 * Hook for work with IPFS.
 */
export default function useIpfs() {
  const infuraClient = create({
    url: process.env.NEXT_PUBLIC_INFURA_IPFS_API,
  });
  const theGraphClient = create({
    url: process.env.NEXT_PUBLIC_THE_GRAPH_IPFS_API,
  });

  let uploadFileToIPFS = async function (file: any) {
    const created = await infuraClient.add({
      path: '',
      content: file,
    });
    const cid = created.path;
    const url = `https://ipfs.infura.io/ipfs/${cid}`;
    return { cid, url };
  };

  let uploadJsonToIPFS = async function (json: any) {
    // Upload to the graph for usage in graph queries
    await theGraphClient.add(JSON.stringify(json));
    // Upload to infura
    const created = await infuraClient.add(JSON.stringify(json));
    const cid = created.path;
    const url = `https://ipfs.infura.io/ipfs/${cid}`;
    return { cid, url };
  };

  let loadJsonFromIPFS = async function (url: any) {
    const response = await axios.get(url);
    if (response.data.errors) {
      throw new Error(`Error loading json from IPFS: ${response.data.errors}`);
    }
    return response.data;
  };

  return { uploadFileToIPFS, uploadJsonToIPFS, loadJsonFromIPFS };
}
