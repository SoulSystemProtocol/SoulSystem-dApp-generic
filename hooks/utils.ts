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
  if (entName.toLocaleLowerCase() == 'mdao') return plural ? 'Teams' : 'Team';
  if (entName.toLocaleLowerCase() == 'project')
    // return plural ? 'Projects' : 'Project';
    return plural ? 'Buidls' : 'Buidl';
  if (entName.toLocaleLowerCase() == 'task')
    return plural ? 'Bounties' : 'Bounty';
  //Default
  return plural ? 'Entities' : 'Entity';
};

/**
 * (Re)Name a Role
 */
export const nameRole = function (name: string, type: string): string {
  return name;
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

/**
 * Check if a value is a numeric
 */
export const isNumber = (value: string): boolean => {
  return /^-{0,1}\d+$/.test(value);
};
