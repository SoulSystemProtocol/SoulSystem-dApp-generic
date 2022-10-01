export default class NoWalletError extends Error {
  constructor() {
    super(`To Proceed, Please Connect Your Web3 Wallet`);
    this.name = 'NoWalletError';
  }
}
