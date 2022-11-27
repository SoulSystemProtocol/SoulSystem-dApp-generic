import Project from 'classes/Project';
import { GAME_TYPE } from 'constants/contracts';
import useSubgraph from './useSubgraph';

/**
 * Hook for work with projects.
 */
export default function useProject() {
  // const { setUri } = useGameContract();
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

  const getProjectById = async function (id: string): Promise<Project | null> {
    const projects = await getProjects([id]);
    return projects.length > 0 ? projects[0] : null;
  };

  const getProjects = async function (
    ids?: Array<string>,
    first = 10,
    skip = 0,
  ): Promise<Array<Project>> {
    const subgraphGames = await findGames(ids, GAME_TYPE.project, first, skip);
    return subgraphGames.map((subgraphGame: any) =>
      convertSubgraphGameToProject(subgraphGame),
    );
  };

  const isSoulHasRole = function (
    project: Project,
    soul: string,
    roleId: string,
  ): boolean {
    return getSoulsByRole(project, roleId).includes(soul);
  };

  const getSoulsByRole = function (project: Project, roleId: string) {
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

function convertSubgraphGameToProject(subgraphGame: any) {
  return new Project(
    subgraphGame.id,
    subgraphGame.name,
    subgraphGame.type,
    subgraphGame.roles,
    subgraphGame.posts,
  );
}
