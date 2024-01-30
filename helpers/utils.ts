/**
 * Check if a value is a numeric
 */
export const isNumber = (value: string | number): boolean => {
  try {
    return /^-{0,1}\d+$/.test(value.toString());
  } catch (error) {
    console.error('[CAUGHT] isNumber()', { value, error });
    return false;
  }
};

/**
 * Number to Hex
 */
export const toHex = (number: number): string => {
  return '0x' + number.toString(16);
};

/**
 * (Re)Name a Role
 */
export const nameRole = function (name: string, type: string): string {
  return name;
};

/**
 * Name an entity
 * 'MDAO', 'PROJECT',
 */
export const nameEntity = function (
  entName: string = '',
  plural: boolean = false,
): string {
  // if (entName == '') return plural ? 'SBT Profiles' : 'Profile';
  // if (entName == '') return plural ? 'Builders' : 'Builder';
  // if (entName == '') return plural ? 'Devs' : 'Dev';
  // if (entName == '') return plural ? 'Souls' : 'Soul';
  // if (entName == '') return plural ? 'Lancers' : 'Lancer';
  if (entName == '') return plural ? 'People' : 'Person';
  // if (entName.toLocaleLowerCase() == 'mdao') return plural ? 'Pods' : 'Pod';
  // if (entName.toLocaleLowerCase() == 'mdao') return plural ? 'mDAOs' : 'mDAO';
  if (entName.toLocaleLowerCase() == 'mdao')
    return plural ? 'Services' : 'Service';
  if (entName.toLocaleLowerCase() == 'project')
    // return plural ? 'Projects' : 'Project';
    // return plural ? 'Foundations' : 'Foundation';
    return plural ? 'Communities' : 'Community';
  // return plural ? 'Buidls' : 'Buidl';
  if (entName.toLocaleLowerCase() == 'task')
    // return plural ? 'Bounties' : 'Bounty';
    // return plural ? 'Requests' : 'Request';
    return plural ? 'Work' : 'Work';
  if (entName.toLocaleLowerCase() == 'rule') return plural ? 'Values' : 'Value';
  //Default
  return plural ? 'Entities' : 'Entity';
};

export const capitalizeEveryWord = (str: string): string => {
  // Split the string into an array of words
  const words = str.split(' ');
  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  // Join the capitalized words back into a string
  return capitalizedWords.join(' ');
};
