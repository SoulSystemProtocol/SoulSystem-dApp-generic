import { GAME_TYPE } from 'constants/contracts';
import useHubContract from './contracts/useHubContract';

/**
 * Hook for work with DAOs.
 */
export default function useDao() {
  const { gameMake } = useHubContract();

  let createDao = async function (
    name: string,
    metadataUrl: string,
  ): Promise<any> {
    return gameMake(GAME_TYPE.dao, name, metadataUrl);
  };

  return {
    createDao,
  };
}
