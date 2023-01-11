import { analyticsCatchErrorEvent } from 'utils/analytics';

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
 * Validate ENV
 */
export const validateEnv = (name: string, value?: string): void => {
  if (!value) {
    console.error('Missing ENV:' + name);
    analyticsCatchErrorEvent(new Error('Missing ENV: ' + name), {
      type: 'missing env',
      name,
    });
  }
};
