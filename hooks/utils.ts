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
