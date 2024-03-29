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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface Dummy2Interface extends utils.Interface {
  functions: {
    "debugFunc()": FunctionFragment;
    "debugFunc2()": FunctionFragment;
    "getRepoAddr()": FunctionFragment;
    "hub()": FunctionFragment;
    "useSelf()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "debugFunc"
      | "debugFunc2"
      | "getRepoAddr"
      | "hub"
      | "useSelf"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "debugFunc", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "debugFunc2",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRepoAddr",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "hub", values?: undefined): string;
  encodeFunctionData(functionFragment: "useSelf", values?: undefined): string;

  decodeFunctionResult(functionFragment: "debugFunc", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "debugFunc2", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRepoAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hub", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "useSelf", data: BytesLike): Result;

  events: {};
}

export interface Dummy2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: Dummy2Interface;

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
    debugFunc(overrides?: CallOverrides): Promise<[string]>;

    debugFunc2(overrides?: CallOverrides): Promise<[string]>;

    getRepoAddr(overrides?: CallOverrides): Promise<[string]>;

    hub(overrides?: CallOverrides): Promise<[string]>;

    useSelf(overrides?: CallOverrides): Promise<[string]>;
  };

  debugFunc(overrides?: CallOverrides): Promise<string>;

  debugFunc2(overrides?: CallOverrides): Promise<string>;

  getRepoAddr(overrides?: CallOverrides): Promise<string>;

  hub(overrides?: CallOverrides): Promise<string>;

  useSelf(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    debugFunc(overrides?: CallOverrides): Promise<string>;

    debugFunc2(overrides?: CallOverrides): Promise<string>;

    getRepoAddr(overrides?: CallOverrides): Promise<string>;

    hub(overrides?: CallOverrides): Promise<string>;

    useSelf(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    debugFunc(overrides?: CallOverrides): Promise<BigNumber>;

    debugFunc2(overrides?: CallOverrides): Promise<BigNumber>;

    getRepoAddr(overrides?: CallOverrides): Promise<BigNumber>;

    hub(overrides?: CallOverrides): Promise<BigNumber>;

    useSelf(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    debugFunc(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    debugFunc2(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRepoAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hub(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    useSelf(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
