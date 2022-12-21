/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { OpinionRepo, OpinionRepoInterface } from "../OpinionRepo";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "origin",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "target",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "domain",
        type: "string",
      },
      {
        indexed: false,
        internalType: "int8",
        name: "score",
        type: "int8",
      },
    ],
    name: "OpinionChange",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getExtTokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTargetContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "originSBT",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "targetSBT",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "domain",
        type: "string",
      },
    ],
    name: "getValueByDomain",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610401806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80637a8639ed146100465780638abe564f14610068578063ca59aa3314610089575b600080fd5b6000546001600160a01b031660405161005f91906103b7565b60405180910390f35b61007b6100763660046102e7565b61009c565b60405190815260200161005f565b61007b61009736600461032d565b6101a0565b600080546001600160a01b03838116911614156101205760405162461bcd60e51b815260206004820152603760248201527f547261636b65723a20736f7572636520636f6e74726163742061646472657373604482015276081a5cc81b9bdd0818481d985b1a59081858d8dbdd5b9d604a1b60648201526084015b60405180910390fd5b600061012b836101e2565b90508061019a5760405162461bcd60e51b815260206004820152603760248201527f547261636b65723a20726571756573746564206163636f756e74206e6f7420666044820152761bdd5b99081bdb881cdbdd5c98d94818dbdb9d1c9858dd604a1b6064820152608401610117565b92915050565b600084815260016020908152604080832086845290915280822090516101c990859085906103a7565b9081526020016040518091039020549050949350505050565b600080546001600160a01b03838116911614156102675760405162461bcd60e51b815260206004820152603e60248201527f45524331313535547261636b65723a20736f7572636520636f6e74726163742060448201527f61646472657373206973206e6f7420612076616c6964206163636f756e7400006064820152608401610117565b60005460405163724686d760e01b81526001600160a01b039091169063724686d7906102979085906004016103b7565b60206040518083038186803b1580156102af57600080fd5b505afa1580156102c3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061019a9190610315565b6000602082840312156102f8578081fd5b81356001600160a01b038116811461030e578182fd5b9392505050565b600060208284031215610326578081fd5b5051919050565b60008060008060608587031215610342578283fd5b843593506020850135925060408501356001600160401b0380821115610366578384fd5b818701915087601f830112610379578384fd5b813581811115610387578485fd5b886020828501011115610398578485fd5b95989497505060200194505050565b8183823760009101908152919050565b6001600160a01b039190911681526020019056fea26469706673582212200c7b3f016f3801d3bafc4c6de2bee0ce8c3b0173e076497a21717b4bb82e2eb764736f6c63430008040033";

type OpinionRepoConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OpinionRepoConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OpinionRepo__factory extends ContractFactory {
  constructor(...args: OpinionRepoConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "OpinionRepo";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<OpinionRepo> {
    return super.deploy(overrides || {}) as Promise<OpinionRepo>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): OpinionRepo {
    return super.attach(address) as OpinionRepo;
  }
  connect(signer: Signer): OpinionRepo__factory {
    return super.connect(signer) as OpinionRepo__factory;
  }
  static readonly contractName: "OpinionRepo";
  public readonly contractName: "OpinionRepo";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OpinionRepoInterface {
    return new utils.Interface(_abi) as OpinionRepoInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OpinionRepo {
    return new Contract(address, _abi, signerOrProvider) as OpinionRepo;
  }
}