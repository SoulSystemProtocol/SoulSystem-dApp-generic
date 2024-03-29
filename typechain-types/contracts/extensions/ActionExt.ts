/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
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

export declare namespace ActionExt {
  export type RoleMapStruct = {
    role: PromiseOrValue<string>;
    addr: PromiseOrValue<string>;
  };

  export type RoleMapStructOutput = [string, string] & {
    role: string;
    addr: string;
  };

  export type IntMapStruct = {
    role: PromiseOrValue<string>;
    value: PromiseOrValue<BigNumberish>;
  };

  export type IntMapStructOutput = [string, BigNumber] & {
    role: string;
    value: BigNumber;
  };

  export type StrMapStruct = {
    role: PromiseOrValue<string>;
    value: PromiseOrValue<string>;
  };

  export type StrMapStructOutput = [string, string] & {
    role: string;
    value: string;
  };
}

export interface ActionExtInterface extends utils.Interface {
  functions: {
    "getRepoAddr()": FunctionFragment;
    "hub()": FunctionFragment;
    "runActionData(bytes32,bytes)": FunctionFragment;
    "runActionXX(bytes32,(string,address)[],(string,uint256)[],(string,string)[])": FunctionFragment;
    "test()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getRepoAddr"
      | "hub"
      | "runActionData"
      | "runActionXX"
      | "test"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getRepoAddr",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "hub", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "runActionData",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "runActionXX",
    values: [
      PromiseOrValue<BytesLike>,
      ActionExt.RoleMapStruct[],
      ActionExt.IntMapStruct[],
      ActionExt.StrMapStruct[]
    ]
  ): string;
  encodeFunctionData(functionFragment: "test", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "getRepoAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hub", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "runActionData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "runActionXX",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "test", data: BytesLike): Result;

  events: {};
}

export interface ActionExt extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ActionExtInterface;

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
    getRepoAddr(overrides?: CallOverrides): Promise<[string]>;

    hub(overrides?: CallOverrides): Promise<[string]>;

    runActionData(
      actionGUID: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    runActionXX(
      actionGUID: PromiseOrValue<BytesLike>,
      roleMap: ActionExt.RoleMapStruct[],
      intMap: ActionExt.IntMapStruct[],
      strMap: ActionExt.StrMapStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    test(overrides?: CallOverrides): Promise<[string]>;
  };

  getRepoAddr(overrides?: CallOverrides): Promise<string>;

  hub(overrides?: CallOverrides): Promise<string>;

  runActionData(
    actionGUID: PromiseOrValue<BytesLike>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  runActionXX(
    actionGUID: PromiseOrValue<BytesLike>,
    roleMap: ActionExt.RoleMapStruct[],
    intMap: ActionExt.IntMapStruct[],
    strMap: ActionExt.StrMapStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  test(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getRepoAddr(overrides?: CallOverrides): Promise<string>;

    hub(overrides?: CallOverrides): Promise<string>;

    runActionData(
      actionGUID: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    runActionXX(
      actionGUID: PromiseOrValue<BytesLike>,
      roleMap: ActionExt.RoleMapStruct[],
      intMap: ActionExt.IntMapStruct[],
      strMap: ActionExt.StrMapStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    test(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getRepoAddr(overrides?: CallOverrides): Promise<BigNumber>;

    hub(overrides?: CallOverrides): Promise<BigNumber>;

    runActionData(
      actionGUID: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    runActionXX(
      actionGUID: PromiseOrValue<BytesLike>,
      roleMap: ActionExt.RoleMapStruct[],
      intMap: ActionExt.IntMapStruct[],
      strMap: ActionExt.StrMapStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    test(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getRepoAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hub(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    runActionData(
      actionGUID: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    runActionXX(
      actionGUID: PromiseOrValue<BytesLike>,
      roleMap: ActionExt.RoleMapStruct[],
      intMap: ActionExt.IntMapStruct[],
      strMap: ActionExt.StrMapStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    test(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
