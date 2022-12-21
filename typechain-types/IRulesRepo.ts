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

export declare namespace DataTypes {
  export type ConfirmationStruct = {
    ruling: string;
    evidence: boolean;
    witness: BigNumberish;
  };

  export type ConfirmationStructOutput = [string, boolean, BigNumber] & {
    ruling: string;
    evidence: boolean;
    witness: BigNumber;
  };

  export type RepChangeStruct = {
    domain: string;
    value: BigNumberish;
    disabled: boolean;
  };

  export type RepChangeStructOutput = [string, BigNumber, boolean] & {
    domain: string;
    value: BigNumber;
    disabled: boolean;
  };

  export type RuleStruct = {
    about: BytesLike;
    affected: string;
    negation: boolean;
    uri: string;
    disabled: boolean;
  };

  export type RuleStructOutput = [string, string, boolean, string, boolean] & {
    about: string;
    affected: string;
    negation: boolean;
    uri: string;
    disabled: boolean;
  };
}

export interface IRulesRepoInterface extends utils.Interface {
  contractName: "IRulesRepo";
  functions: {
    "confirmationGet(uint256)": FunctionFragment;
    "effectsGet(uint256)": FunctionFragment;
    "effectsGetOf(address,uint256)": FunctionFragment;
    "ruleAdd((bytes32,string,bool,string,bool),(string,bool,uint256),(string,int256,bool)[])": FunctionFragment;
    "ruleConfirmationUpdate(uint256,(string,bool,uint256))": FunctionFragment;
    "ruleDisable(uint256,bool)": FunctionFragment;
    "ruleGet(uint256)": FunctionFragment;
    "ruleUpdate(uint256,(bytes32,string,bool,string,bool),(string,int256,bool)[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "confirmationGet",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "effectsGet",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "effectsGetOf",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "ruleAdd",
    values: [
      DataTypes.RuleStruct,
      DataTypes.ConfirmationStruct,
      DataTypes.RepChangeStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "ruleConfirmationUpdate",
    values: [BigNumberish, DataTypes.ConfirmationStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "ruleDisable",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "ruleGet",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "ruleUpdate",
    values: [BigNumberish, DataTypes.RuleStruct, DataTypes.RepChangeStruct[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "confirmationGet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "effectsGet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "effectsGetOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ruleAdd", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ruleConfirmationUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ruleDisable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ruleGet", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ruleUpdate", data: BytesLike): Result;

  events: {
    "Claim(address,uint256,bytes32)": EventFragment;
    "Confirmation(address,uint256,string,bool,uint256)": EventFragment;
    "Rule(address,uint256,bytes32,string,string,bool)": EventFragment;
    "RuleDisabled(address,uint256,bool)": EventFragment;
    "RuleEffect(address,uint256,string,int256)": EventFragment;
    "RuleRemoved(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Confirmation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Rule"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RuleDisabled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RuleEffect"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RuleRemoved"): EventFragment;
}

export type ClaimEvent = TypedEvent<
  [string, BigNumber, string],
  { originAddress: string; id: BigNumber; claimId: string }
>;

export type ClaimEventFilter = TypedEventFilter<ClaimEvent>;

export type ConfirmationEvent = TypedEvent<
  [string, BigNumber, string, boolean, BigNumber],
  {
    originAddress: string;
    id: BigNumber;
    ruling: string;
    evidence: boolean;
    witness: BigNumber;
  }
>;

export type ConfirmationEventFilter = TypedEventFilter<ConfirmationEvent>;

export type RuleEvent = TypedEvent<
  [string, BigNumber, string, string, string, boolean],
  {
    originAddress: string;
    id: BigNumber;
    about: string;
    affected: string;
    uri: string;
    negation: boolean;
  }
>;

export type RuleEventFilter = TypedEventFilter<RuleEvent>;

export type RuleDisabledEvent = TypedEvent<
  [string, BigNumber, boolean],
  { originAddress: string; id: BigNumber; disabled: boolean }
>;

export type RuleDisabledEventFilter = TypedEventFilter<RuleDisabledEvent>;

export type RuleEffectEvent = TypedEvent<
  [string, BigNumber, string, BigNumber],
  { originAddress: string; id: BigNumber; domain: string; value: BigNumber }
>;

export type RuleEffectEventFilter = TypedEventFilter<RuleEffectEvent>;

export type RuleRemovedEvent = TypedEvent<
  [string, BigNumber],
  { originAddress: string; id: BigNumber }
>;

export type RuleRemovedEventFilter = TypedEventFilter<RuleRemovedEvent>;

export interface IRulesRepo extends BaseContract {
  contractName: "IRulesRepo";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IRulesRepoInterface;

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
    confirmationGet(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[DataTypes.ConfirmationStructOutput]>;

    effectsGet(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[DataTypes.RepChangeStructOutput[]]>;

    effectsGetOf(
      ownerAddress: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[DataTypes.RepChangeStructOutput[]]>;

    ruleAdd(
      rule: DataTypes.RuleStruct,
      confirmation: DataTypes.ConfirmationStruct,
      effects: DataTypes.RepChangeStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ruleConfirmationUpdate(
      id: BigNumberish,
      confirmation: DataTypes.ConfirmationStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ruleDisable(
      id: BigNumberish,
      disabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ruleGet(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[DataTypes.RuleStructOutput]>;

    ruleUpdate(
      id: BigNumberish,
      rule: DataTypes.RuleStruct,
      effects: DataTypes.RepChangeStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  confirmationGet(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<DataTypes.ConfirmationStructOutput>;

  effectsGet(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<DataTypes.RepChangeStructOutput[]>;

  effectsGetOf(
    ownerAddress: string,
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<DataTypes.RepChangeStructOutput[]>;

  ruleAdd(
    rule: DataTypes.RuleStruct,
    confirmation: DataTypes.ConfirmationStruct,
    effects: DataTypes.RepChangeStruct[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ruleConfirmationUpdate(
    id: BigNumberish,
    confirmation: DataTypes.ConfirmationStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ruleDisable(
    id: BigNumberish,
    disabled: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ruleGet(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<DataTypes.RuleStructOutput>;

  ruleUpdate(
    id: BigNumberish,
    rule: DataTypes.RuleStruct,
    effects: DataTypes.RepChangeStruct[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    confirmationGet(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<DataTypes.ConfirmationStructOutput>;

    effectsGet(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<DataTypes.RepChangeStructOutput[]>;

    effectsGetOf(
      ownerAddress: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<DataTypes.RepChangeStructOutput[]>;

    ruleAdd(
      rule: DataTypes.RuleStruct,
      confirmation: DataTypes.ConfirmationStruct,
      effects: DataTypes.RepChangeStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ruleConfirmationUpdate(
      id: BigNumberish,
      confirmation: DataTypes.ConfirmationStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    ruleDisable(
      id: BigNumberish,
      disabled: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    ruleGet(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<DataTypes.RuleStructOutput>;

    ruleUpdate(
      id: BigNumberish,
      rule: DataTypes.RuleStruct,
      effects: DataTypes.RepChangeStruct[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Claim(address,uint256,bytes32)"(
      originAddress?: string | null,
      id?: BigNumberish | null,
      claimId?: null
    ): ClaimEventFilter;
    Claim(
      originAddress?: string | null,
      id?: BigNumberish | null,
      claimId?: null
    ): ClaimEventFilter;

    "Confirmation(address,uint256,string,bool,uint256)"(
      originAddress?: string | null,
      id?: BigNumberish | null,
      ruling?: null,
      evidence?: null,
      witness?: null
    ): ConfirmationEventFilter;
    Confirmation(
      originAddress?: string | null,
      id?: BigNumberish | null,
      ruling?: null,
      evidence?: null,
      witness?: null
    ): ConfirmationEventFilter;

    "Rule(address,uint256,bytes32,string,string,bool)"(
      originAddress?: string | null,
      id?: BigNumberish | null,
      about?: null,
      affected?: null,
      uri?: null,
      negation?: null
    ): RuleEventFilter;
    Rule(
      originAddress?: string | null,
      id?: BigNumberish | null,
      about?: null,
      affected?: null,
      uri?: null,
      negation?: null
    ): RuleEventFilter;

    "RuleDisabled(address,uint256,bool)"(
      originAddress?: string | null,
      id?: null,
      disabled?: null
    ): RuleDisabledEventFilter;
    RuleDisabled(
      originAddress?: string | null,
      id?: null,
      disabled?: null
    ): RuleDisabledEventFilter;

    "RuleEffect(address,uint256,string,int256)"(
      originAddress?: string | null,
      id?: BigNumberish | null,
      domain?: null,
      value?: null
    ): RuleEffectEventFilter;
    RuleEffect(
      originAddress?: string | null,
      id?: BigNumberish | null,
      domain?: null,
      value?: null
    ): RuleEffectEventFilter;

    "RuleRemoved(address,uint256)"(
      originAddress?: string | null,
      id?: BigNumberish | null
    ): RuleRemovedEventFilter;
    RuleRemoved(
      originAddress?: string | null,
      id?: BigNumberish | null
    ): RuleRemovedEventFilter;
  };

  estimateGas: {
    confirmationGet(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    effectsGet(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    effectsGetOf(
      ownerAddress: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ruleAdd(
      rule: DataTypes.RuleStruct,
      confirmation: DataTypes.ConfirmationStruct,
      effects: DataTypes.RepChangeStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ruleConfirmationUpdate(
      id: BigNumberish,
      confirmation: DataTypes.ConfirmationStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ruleDisable(
      id: BigNumberish,
      disabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ruleGet(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    ruleUpdate(
      id: BigNumberish,
      rule: DataTypes.RuleStruct,
      effects: DataTypes.RepChangeStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    confirmationGet(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    effectsGet(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    effectsGetOf(
      ownerAddress: string,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ruleAdd(
      rule: DataTypes.RuleStruct,
      confirmation: DataTypes.ConfirmationStruct,
      effects: DataTypes.RepChangeStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ruleConfirmationUpdate(
      id: BigNumberish,
      confirmation: DataTypes.ConfirmationStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ruleDisable(
      id: BigNumberish,
      disabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ruleGet(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ruleUpdate(
      id: BigNumberish,
      rule: DataTypes.RuleStruct,
      effects: DataTypes.RepChangeStruct[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}