import { GAME_TYPE } from 'constants/contracts';
import useSubgraph from './useSubgraph';

/**
 * Hook for work with projects.
 */
export default function useProject() {
  const { findGames } = useSubgraph();

  /* DEPRECATED
  const createProject = async function (
    name: string,
    metadataUrl: string,
  ): Promise<any> {
    return makeGame(GAME_TYPE.project, name, metadataUrl);
  };

  const editProject = async function (id: string, metadataUrl: string) {
    return setUri(id, metadataUrl);
  };
  */

  const getProjectById = async function (id: string): Promise<any | null> {
    const projects = await getProjects([id]);
    return projects.length > 0 ? projects[0] : null;
  };

  const getProjects = async function (
    ids?: Array<string>,
    first = 10,
    skip = 0,
  ): Promise<Array<any>> {
    const subgraphGames = await findGames(ids, GAME_TYPE.project, first, skip);
    return subgraphGames;
  };

  const isSoulHasRole = function (
    project: any,
    soul: string,
    roleId: string,
  ): boolean {
    return getSoulsByRole(project, roleId).includes(soul);
  };

  const getSoulsByRole = function (project: any, roleId: string) {
    const projectRole = project.roles?.find(
      (element: any) => element?.roleId === roleId,
    );
    return projectRole?.souls || [];
  };

  return {
    // editProject,
    getProjectById,
    getProjects,
    isSoulHasRole,
    getSoulsByRole,
  };
}
