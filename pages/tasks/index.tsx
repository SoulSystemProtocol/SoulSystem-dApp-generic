import { getPageTitle } from '../../utils';
import Layout from 'components/layout/Layout';
import { processCardContent } from 'utils/cardContents';
import { GAME_DESC } from 'constants/contracts';
import { nameEntity } from 'hooks/utils';
import PaginatedList from 'components/PaginatedList';
import SoulsByTypeRoleQuery from 'queries/SoulsByTypeRoleQuery';

const CONF = {
  PAGE_TITLE: nameEntity('task', true),
  TITLE: nameEntity('task', true),
  SUBTITLE: GAME_DESC.task,
};

/**
 * Page for a list of projects
 */
export default function TaskPage({}: any) {
  // const { accountSoul } = useContext(DataContext);
  // const { showDialog, closeDialog } = useContext(DialogContext);

  const listProps = {
    variables: {
      type: 'TASK',
      role: 'bounty',
    },
    getCardContent: processCardContent,
    // renderActions: (
    //   <Button
    //     disabled={!accountSoul}
    //     onClick={() =>
    //       showDialog?.(<ProjectManageDialog onClose={closeDialog} />)
    //     }
    //     variant="outlined"
    //   >
    //     Create Task
    //   </Button>
    // ),
    subtitle: CONF.SUBTITLE,
    title: CONF.TITLE,
    gridMD: 12,
    gridLG: 12,
    query: SoulsByTypeRoleQuery,
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <PaginatedList {...listProps} />
    </Layout>
  );
}
