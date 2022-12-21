/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
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

export interface AssocRepoInterface extends utils.Interface {
  functions: {
    "get(string)": FunctionFragment;
    "getOf(address,string)": FunctionFragment;
    "name()": FunctionFragment;
    "set(string,address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "get"
      | "getOf"
      | "name"
      | "set"
      | "supportsInterface"
      | "symbol"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "get",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getOf",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "set",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;

  decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;

  events: {
    "Assoc(address,string,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Assoc"): EventFragment;
}

export interface AssocEventObject {
  originContract: string;
  key: string;
  destinationContract: string;
}
export type AssocEvent = TypedEvent<[string, string, string], AssocEventObject>;

export type AssocEventFilter = TypedEventFilter<AssocEvent>;

export interface AssocRepo extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AssocRepoInterface;

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
    get(
      key: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getOf(
      originContract: PromiseOrValue<string>,
      key: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    set(
      key: PromiseOrValue<string>,
      destinationContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;
  };

  get(key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

  getOf(
    originContract: PromiseOrValue<string>,
    key: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  name(overrides?: CallOverrides): Promise<string>;

  set(
    key: PromiseOrValue<string>,
    destinationContract: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    get(
      key: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getOf(
      originContract: PromiseOrValue<string>,
      key: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    name(overrides?: CallOverrides): Promise<string>;

    set(
      key: PromiseOrValue<string>,
      destinationContract: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Assoc(address,string,address)"(
      originContract?: null,
      key?: null,
      destinationContract?: null
    ): AssocEventFilter;
    Assoc(
      originContract?: null,
      key?: null,
      destinationContract?: null
    ): AssocEventFilter;
  };

  estimateGas: {
    get(
      key: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOf(
      originContract: PromiseOrValue<string>,
      key: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    set(
      key: PromiseOrValue<string>,
      destinationContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    get(
      key: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOf(
      originContract: PromiseOrValue<string>,
      key: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    set(
      key: PromiseOrValue<string>,
      destinationContract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}