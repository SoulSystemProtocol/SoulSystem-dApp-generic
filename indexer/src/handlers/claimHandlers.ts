import { handlerNotPorted } from './migration';

export const handleStage = () => handlerNotPorted('Claim.Stage');
export const handleTransferByToken = () =>
  handlerNotPorted('Claim.TransferByToken');
export const handleNominate = () => handlerNotPorted('Claim.Nominate');
export const handlePost = () => handlerNotPorted('Claim.Post');
export const handleRoleCreated = () => handlerNotPorted('Claim.RoleCreated');
export const handleUriChange = () => handlerNotPorted('Claim.URI');
export const handlePaymentReleased = () =>
  handlerNotPorted('Claim.PaymentReleased');
export const handlePaymentReleasedERC20 = () =>
  handlerNotPorted('Claim.ERC20PaymentReleased');
