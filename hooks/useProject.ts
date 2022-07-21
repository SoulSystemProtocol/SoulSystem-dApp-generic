import Project from 'classes/Project';
import { GAME_TYPE } from 'constants/contracts';
import { hexStringToJson } from 'utils/converters';
import useGameContract from './contracts/useGameContract';
import useHubContract from './contracts/useHubContract';
import useSubgraph from './useSubgraph';

/**
 * Hook for work with projects.
 */
export default function useProject() {
  const { gameMake } = useHubContract();
  const { setUri } = useGameContract();
  const { findGames } = useSubgraph();

  let createProject = async function (
    name: string,
    metadataUrl: string,
  ): Promise<any> {
    return gameMake(GAME_TYPE.project, name, metadataUrl);
  };

  let editProject = async function (id: string, metadataUrl: string) {
    return setUri(id, metadataUrl);
  };

  let getProjectById = async function (id: string): Promise<Project | null> {
    const projects = await getProjects([id]);
    return projects.length > 0 ? projects[0] : null;
  };

  let getProjects = async function (
    ids?: Array<string>,
    first = 10,
    skip = 0,
  ): Promise<Array<Project>> {
    const subgraphGames = await findGames(ids, GAME_TYPE.project, first, skip);
    return subgraphGames.map((subgraphGame: any) =>
      convertSubgraphGameToProject(subgraphGame),
    );
  };

  let isSoulHasRole = function (
    project: Project,
    soul: string,
    roleId: string,
  ): boolean {
    return getSoulsByRole(project, roleId).includes(soul);
  };

  let getSoulsByRole = function (project: Project, roleId: string) {
    const projectRole = project.roles?.find(
      (element: any) => element?.roleId === roleId,
    );
    return projectRole?.souls || [];
  };

  return {
    createProject,
    editProject,
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
    subgraphGame.uri,
    hexStringToJson(subgraphGame.uriData),
    subgraphGame.roles,
  );
}
