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

export interface SafeERC1155Interface extends utils.Interface {
  contractName: "SafeERC1155";
  functions: {
    "balanceOf(address,uint256)": FunctionFragment;
    "balanceOfBatch(address[],uint256[])": FunctionFragment;
    "balanceOfToken(uint256,uint256)": FunctionFragment;
    "burn(address,uint256,uint256)": FunctionFragment;
    "burnBatch(address,uint256[],uint256[])": FunctionFragment;
    "contractURI()": FunctionFragment;
    "getCurrentSBT()": FunctionFragment;
    "getExtTokenId(address)": FunctionFragment;
    "getHub()": FunctionFragment;
    "getRepoAddr()": FunctionFragment;
    "getTargetContract()": FunctionFragment;
    "initialize(string,address)": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "mint(address,uint256,uint256,string)": FunctionFragment;
    "mintBatch(address,uint256[],uint256[],bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "safeTransferFrom(address,address,uint256,uint256,bytes)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "setHub(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "uniqueMembers(uint256)": FunctionFragment;
    "uniqueMembersCount(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfBatch",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfToken",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "burn",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "burnBatch",
    values: [string, BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "contractURI",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentSBT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getExtTokenId",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "getHub", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRepoAddr",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTargetContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "mintBatch",
    values: [string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "safeBatchTransferFrom",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(functionFragment: "setHub", values: [string]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "uniqueMembers",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "uniqueMembersCount",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burnBatch", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "contractURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentSBT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getExtTokenId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getHub", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRepoAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTargetContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintBatch", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeBatchTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setHub", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniqueMembers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniqueMembersCount",
    data: BytesLike
  ): Result;

  events: {
    "ApprovalForAll(address,address,bool)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "TransferBatch(address,address,address,uint256[],uint256[])": EventFragment;
    "TransferBatchByToken(address,uint256,uint256,uint256[],uint256[])": EventFragment;
    "TransferByToken(address,uint256,uint256,uint256,uint256)": EventFragment;
    "TransferSingle(address,address,address,uint256,uint256)": EventFragment;
    "URI(string,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferBatch"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferBatchByToken"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferByToken"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferSingle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "URI"): EventFragment;
}

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  { account: string; operator: string; approved: boolean }
>;

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;

export type InitializedEvent = TypedEvent<[number], { version: number }>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type TransferBatchEvent = TypedEvent<
  [string, string, string, BigNumber[], BigNumber[]],
  {
    operator: string;
    from: string;
    to: string;
    ids: BigNumber[];
    values: BigNumber[];
  }
>;

export type TransferBatchEventFilter = TypedEventFilter<TransferBatchEvent>;

export type TransferBatchByTokenEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber[], BigNumber[]],
  {
    operator: string;
    fromOwnerToken: BigNumber;
    toOwnerToken: BigNumber;
    ids: BigNumber[];
    values: BigNumber[];
  }
>;

export type TransferBatchByTokenEventFilter =
  TypedEventFilter<TransferBatchByTokenEvent>;

export type TransferByTokenEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber],
  {
    operator: string;
    fromOwnerToken: BigNumber;
    toOwnerToken: BigNumber;
    id: BigNumber;
    value: BigNumber;
  }
>;

export type TransferByTokenEventFilter = TypedEventFilter<TransferByTokenEvent>;

export type TransferSingleEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  {
    operator: string;
    from: string;
    to: string;
    id: BigNumber;
    value: BigNumber;
  }
>;

export type TransferSingleEventFilter = TypedEventFilter<TransferSingleEvent>;

export type URIEvent = TypedEvent<
  [string, BigNumber],
  { value: string; id: BigNumber }
>;

export type URIEventFilter = TypedEventFilter<URIEvent>;

export interface SafeERC1155 extends BaseContract {
  contractName: "SafeERC1155";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SafeERC1155Interface;

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
    balanceOf(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    balanceOfBatch(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    balanceOfToken(
      sbt: BigNumberish,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    burn(
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    burnBatch(
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    contractURI(overrides?: CallOverrides): Promise<[string]>;

    getCurrentSBT(overrides?: CallOverrides): Promise<[BigNumber]>;

    getExtTokenId(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getHub(overrides?: CallOverrides): Promise<[string]>;

    getRepoAddr(overrides?: CallOverrides): Promise<[string]>;

    getTargetContract(overrides?: CallOverrides): Promise<[string]>;

    "initialize(string,address)"(
      uri_: string,
      owner_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "initialize(address)"(
      sbtAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isApprovedForAll(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    mint(
      to: string,
      id: BigNumberish,
      value: BigNumberish,
      uri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintBatch(
      to: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setHub(
      hubAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    uniqueMembers(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    uniqueMembersCount(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  balanceOf(
    account: string,
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  balanceOfBatch(
    accounts: string[],
    ids: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  balanceOfToken(
    sbt: BigNumberish,
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  burn(
    from: string,
    id: BigNumberish,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  burnBatch(
    from: string,
    ids: BigNumberish[],
    values: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  contractURI(overrides?: CallOverrides): Promise<string>;

  getCurrentSBT(overrides?: CallOverrides): Promise<BigNumber>;

  getExtTokenId(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  getHub(overrides?: CallOverrides): Promise<string>;

  getRepoAddr(overrides?: CallOverrides): Promise<string>;

  getTargetContract(overrides?: CallOverrides): Promise<string>;

  "initialize(string,address)"(
    uri_: string,
    owner_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "initialize(address)"(
    sbtAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isApprovedForAll(
    account: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  mint(
    to: string,
    id: BigNumberish,
    value: BigNumberish,
    uri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintBatch(
    to: string,
    ids: BigNumberish[],
    values: BigNumberish[],
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  safeBatchTransferFrom(
    from: string,
    to: string,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  safeTransferFrom(
    from: string,
    to: string,
    id: BigNumberish,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setHub(
    hubAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  uniqueMembers(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  uniqueMembersCount(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    balanceOf(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfBatch(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    balanceOfToken(
      sbt: BigNumberish,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    burn(
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    burnBatch(
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    contractURI(overrides?: CallOverrides): Promise<string>;

    getCurrentSBT(overrides?: CallOverrides): Promise<BigNumber>;

    getExtTokenId(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getHub(overrides?: CallOverrides): Promise<string>;

    getRepoAddr(overrides?: CallOverrides): Promise<string>;

    getTargetContract(overrides?: CallOverrides): Promise<string>;

    "initialize(string,address)"(
      uri_: string,
      owner_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(address)"(
      sbtAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isApprovedForAll(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mint(
      to: string,
      id: BigNumberish,
      value: BigNumberish,
      uri: string,
      overrides?: CallOverrides
    ): Promise<void>;

    mintBatch(
      to: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setHub(hubAddr: string, overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    uniqueMembers(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    uniqueMembersCount(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "ApprovalForAll(address,address,bool)"(
      account?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;
    ApprovalForAll(
      account?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "TransferBatch(address,address,address,uint256[],uint256[])"(
      operator?: string | null,
      from?: string | null,
      to?: string | null,
      ids?: null,
      values?: null
    ): TransferBatchEventFilter;
    TransferBatch(
      operator?: string | null,
      from?: string | null,
      to?: string | null,
      ids?: null,
      values?: null
    ): TransferBatchEventFilter;

    "TransferBatchByToken(address,uint256,uint256,uint256[],uint256[])"(
      operator?: string | null,
      fromOwnerToken?: BigNumberish | null,
      toOwnerToken?: BigNumberish | null,
      ids?: null,
      values?: null
    ): TransferBatchByTokenEventFilter;
    TransferBatchByToken(
      operator?: string | null,
      fromOwnerToken?: BigNumberish | null,
      toOwnerToken?: BigNumberish | null,
      ids?: null,
      values?: null
    ): TransferBatchByTokenEventFilter;

    "TransferByToken(address,uint256,uint256,uint256,uint256)"(
      operator?: string | null,
      fromOwnerToken?: BigNumberish | null,
      toOwnerToken?: BigNumberish | null,
      id?: null,
      value?: null
    ): TransferByTokenEventFilter;
    TransferByToken(
      operator?: string | null,
      fromOwnerToken?: BigNumberish | null,
      toOwnerToken?: BigNumberish | null,
      id?: null,
      value?: null
    ): TransferByTokenEventFilter;

    "TransferSingle(address,address,address,uint256,uint256)"(
      operator?: string | null,
      from?: string | null,
      to?: string | null,
      id?: null,
      value?: null
    ): TransferSingleEventFilter;
    TransferSingle(
      operator?: string | null,
      from?: string | null,
      to?: string | null,
      id?: null,
      value?: null
    ): TransferSingleEventFilter;

    "URI(string,uint256)"(
      value?: null,
      id?: BigNumberish | null
    ): URIEventFilter;
    URI(value?: null, id?: BigNumberish | null): URIEventFilter;
  };

  estimateGas: {
    balanceOf(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfBatch(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfToken(
      sbt: BigNumberish,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    burn(
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    burnBatch(
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    contractURI(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentSBT(overrides?: CallOverrides): Promise<BigNumber>;

    getExtTokenId(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getHub(overrides?: CallOverrides): Promise<BigNumber>;

    getRepoAddr(overrides?: CallOverrides): Promise<BigNumber>;

    getTargetContract(overrides?: CallOverrides): Promise<BigNumber>;

    "initialize(string,address)"(
      uri_: string,
      owner_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "initialize(address)"(
      sbtAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isApprovedForAll(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mint(
      to: string,
      id: BigNumberish,
      value: BigNumberish,
      uri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintBatch(
      to: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setHub(
      hubAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    uniqueMembers(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    uniqueMembersCount(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(
      account: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOfBatch(
      accounts: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOfToken(
      sbt: BigNumberish,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burn(
      from: string,
      id: BigNumberish,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    burnBatch(
      from: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    contractURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentSBT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getExtTokenId(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getHub(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRepoAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTargetContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "initialize(string,address)"(
      uri_: string,
      owner_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "initialize(address)"(
      sbtAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mint(
      to: string,
      id: BigNumberish,
      value: BigNumberish,
      uri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintBatch(
      to: string,
      ids: BigNumberish[],
      values: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setHub(
      hubAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    uniqueMembers(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    uniqueMembersCount(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}