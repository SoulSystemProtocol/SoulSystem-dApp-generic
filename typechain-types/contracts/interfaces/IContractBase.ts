/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IContractBaseInterface extends utils.Interface {
  functions: {
    "contractURI()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "contractURI"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "contractURI",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "contractURI",
    data: BytesLike
  ): Result;

  events: {
    "ContractURI(string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ContractURI"): EventFragment;
}

export interface ContractURIEventObject {
  arg0: string;
}
export type ContractURIEvent = TypedEvent<[string], ContractURIEventObject>;

export type ContractURIEventFilter = TypedEventFilter<ContractURIEvent>;

export interface IContractBase extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IContractBaseInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    contractURI(overrides?: CallOverrides): Promise<[string]>;
  };

  contractURI(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    contractURI(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "ContractURI(string)"(arg0?: null): ContractURIEventFilter;
    ContractURI(arg0?: null): ContractURIEventFilter;
  };

  estimateGas: {
    contractURI(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    contractURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
