/* eslint-disable prettier/prettier */
import { hexStringToJson } from 'utils/converters';
// import Soul from 'classes/Soul';

/**
 * Hook for working with Posts.
 */
export default function usePost() {

  /// Process Graph Post into a workable entity
  function processGraphPost(graphEnt: any) {
    return {
      ...graphEnt,
      metadata: hexStringToJson(graphEnt.metadata),
    };
  }

  return {
    processGraphPost,
  };
}
