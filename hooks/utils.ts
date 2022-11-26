interface CTXEntity {
  roles: [{ id: string; roleId: string; name: string; souls: string[] }];
}

/**
 * Helper method to get item by id
 */
export const getById = async function (
  id: string,
  getData: any,
): Promise<any | null> {
  const data = await getData([id]);
  return !!data.length ? data[0] : null;
};

/**
 * Name an entity
 * 'MDAO', 'PROJECT',
 */
export const nameEntity = function (
  entName: string,
  plural: boolean = false,
): string {
  // if (entName == '') return plural ? 'SBT Profiles' : 'Profile';
  if (entName == '') return plural ? 'Builders' : 'Builder';
  if (entName.toLocaleLowerCase() == 'mdao')
    return plural ? 'Service Pods' : 'Service Pod';
  if (entName.toLocaleLowerCase() == 'project')
    return plural ? 'Projects' : 'Project';
  if (entName.toLocaleLowerCase() == 'task') return plural ? 'Quests' : 'Quest';

  console.log('[DEV] Naming Entity: ', entName);
  return plural ? 'Entities' : 'Entity';
};

/**
 * Get all the roles a soul is assigned to
 */
export const getSoulsByRole = (
  ctx: CTXEntity,
  roleName: string,
): Array<string> => {
  return (
    ctx.roles?.find((element: any) => element?.name === roleName)?.souls || []
  );
};

/**
 * Check if a Soul Has a Role in a certain Context
 */
export const isSoulHasRole = (
  ctx: CTXEntity,
  soulId: string,
  roleName: string,
): boolean => getSoulsByRole(ctx, roleName).includes(soulId);
