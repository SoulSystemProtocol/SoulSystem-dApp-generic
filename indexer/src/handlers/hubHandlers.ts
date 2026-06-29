import { handlerNotPorted } from './migration';

export const handleContractCreated = () =>
  handlerNotPorted(
    'Hub.ContractCreated dynamic Game/Claim contract registration',
  );
