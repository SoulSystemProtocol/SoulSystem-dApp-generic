// import { gql } from '@apollo/client';
import PaginatedListGQ from 'components/PaginatedListGQ';
import querySoulMembership from 'queries/SoulMembershipQuery';

/**
 * Component: Soul list filtered by type & role & Stage
 */
export default function SoulMembership(props: any) {
  return (
    <PaginatedListGQ
      {...props}
      entityName="gameParticipants"
      query={querySoulMembership}
    />
  );
}
