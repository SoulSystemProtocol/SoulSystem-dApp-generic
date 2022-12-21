/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
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
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IOpinionRepoInterface extends utils.Interface {
  contractName: "IOpinionRepo";
  functions: {
    "getTargetContract()": FunctionFragment;
    "getValueByDomain(uint256,uint256,string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getTargetContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getValueByDomain",
    values: [BigNumberish, BigNumberish, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "getTargetContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getValueByDomain",
    data: BytesLike
  ): Result;

  events: {
    "OpinionChange(uint256,uint256,string,int8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OpinionChange"): EventFragment;
}

export type OpinionChangeEvent = TypedEvent<
  [BigNumber, BigNumber, string, number],
  { origin: BigNumber; target: BigNumber; domain: string; score: number }
>;

export type OpinionChangeEventFilter = TypedEventFilter<OpinionChangeEvent>;

export interface IOpinionRepo extends BaseContract {
  contractName: "IOpinionRepo";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IOpinionRepoInterface;

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
    getTargetContract(overrides?: CallOverrides): Promise<[string]>;

    getValueByDomain(
      origin: BigNumberish,
      tokenId: BigNumberish,
      domain: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getTargetContract(overrides?: CallOverrides): Promise<string>;

  getValueByDomain(
    origin: BigNumberish,
    tokenId: BigNumberish,
    domain: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getTargetContract(overrides?: CallOverrides): Promise<string>;

    getValueByDomain(
      origin: BigNumberish,
      tokenId: BigNumberish,
      domain: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "OpinionChange(uint256,uint256,string,int8)"(
      origin?: BigNumberish | null,
      target?: BigNumberish | null,
      domain?: null,
      score?: null
    ): OpinionChangeEventFilter;
    OpinionChange(
      origin?: BigNumberish | null,
      target?: BigNumberish | null,
      domain?: null,
      score?: null
    ): OpinionChangeEventFilter;
  };

  estimateGas: {
    getTargetContract(overrides?: CallOverrides): Promise<BigNumber>;

    getValueByDomain(
      origin: BigNumberish,
      tokenId: BigNumberish,
      domain: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getTargetContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getValueByDomain(
      origin: BigNumberish,
      tokenId: BigNumberish,
      domain: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}