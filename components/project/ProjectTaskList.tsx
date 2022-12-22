import { useContext } from 'react';
import { SelectedSoulContext } from 'contexts/SelectedSoul';
import { containedProcContent } from 'utils/cardContents';
import PaginatedList from 'components/PaginatedList';
import SoulContainedQuery from 'queries/SoulContainedQuery';

/**
 * List of project's tasks
 */
export default function ProjectTaskList({ sx }: any) {
  const { soul } = useContext(SelectedSoulContext);
  const listProps = {
    variables: {
      Bid: soul?.id,
      Arole: 'bounty',
    },
    entityName: 'soulAssocs',
    getCardContent: containedProcContent,
    gridMD: 12,
    gridLG: 12,
    query: SoulContainedQuery,
    sx,
  };

  return <PaginatedList {...listProps} />;
}
