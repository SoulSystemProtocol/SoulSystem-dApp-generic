/**
 * General Helper Functions
 */
export const __ = {
  sanitize: (str: string) => {
    try {
      return typeof str === 'string' ? str.replace(/_/g, ' ') : str;
    } catch (err) {
      console.error('__.sanitize() Error sanitizing metadata field:', {
        str,
        err,
      });
      return str;
    }
  }, //sanitize()

  nl2br: (str: string) => {
    return !str ? str : str.replace(/(?:\r\n|\r|\n)/g, '<br/>');
  },

  stripHTML: (str: string) => {
    return !str ? str : str.replace(/<[^>]*>?/gm, '');
  },

  stackContainerStyle: (length: number) => {
    let style: any = {};
    if (length && length > 1) {
      let len = length < 4 ? length : 4; //Max of 4 in a stack
      style.transform = 'rotate(-' + 5 * (len - 1) + 'deg)';
    }
    return style;
  },

  matchAddr: (a1: any, a2: any) =>
    String(a1).toLowerCase() === String(a2).toLowerCase(),

  /**
   * Match URI Function
   * Try to ignore similar IPFS URLs
   * @returns
   */
  matchURI: (uri1: string, uri2: string) => {
    if (String(uri1).toLowerCase().includes('ipfs')) {
      //Try to ignore this if URLs have the same IPFS ID
      let uri1Adjusted = uri1
        .replace('https://ipfs.moralis.io:2053/ipfs/', '')
        .replace('ipfs://', '');
      let uri2Adjusted = uri2
        .replace('https://ipfs.moralis.io:2053/ipfs/', '')
        .replace('ipfs://', '');
      return uri1Adjusted === uri2Adjusted;
    }
    return uri1 === uri2;
  },

  /**
   * Chop string to size & Add '...' at the end
   */
  ellipsis: (str: string, n: number = 6): string => {
    return str.length > n ? `${str.trim().slice(0, n)}...` : str;
  },
};

export default __;
