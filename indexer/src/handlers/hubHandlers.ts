import { handlerNotPorted } from './migration.js';

export const handleContractCreated = () =>
  handlerNotPorted(
    'Hub.ContractCreated dynamic Game/Claim contract registration',
  );
