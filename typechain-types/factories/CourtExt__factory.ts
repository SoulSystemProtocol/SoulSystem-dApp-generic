/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CourtExt, CourtExtInterface } from "../CourtExt";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
      {
        components: [
          {
            internalType: "address",
            name: "game",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "ruleId",
            type: "uint256",
          },
        ],
        internalType: "struct DataTypes.RuleRef[]",
        name: "rules",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "role",
            type: "string",
          },
        ],
        internalType: "struct DataTypes.InputRoleToken[]",
        name: "assignRoles",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "entRole",
            type: "string",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
        ],
        internalType: "struct DataTypes.PostInput[]",
        name: "posts",
        type: "tuple[]",
      },
    ],
    name: "caseMake",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
      {
        components: [
          {
            internalType: "address",
            name: "game",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "ruleId",
            type: "uint256",
          },
        ],
        internalType: "struct DataTypes.RuleRef[]",
        name: "rules",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "role",
            type: "string",
          },
        ],
        internalType: "struct DataTypes.InputRoleToken[]",
        name: "assignRoles",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "entRole",
            type: "string",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
        ],
        internalType: "struct DataTypes.PostInput[]",
        name: "posts",
        type: "tuple[]",
      },
      {
        internalType: "string",
        name: "decisionURI_",
        type: "string",
      },
    ],
    name: "caseMakeClosed",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
      {
        components: [
          {
            internalType: "address",
            name: "game",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "ruleId",
            type: "uint256",
          },
        ],
        internalType: "struct DataTypes.RuleRef[]",
        name: "rules",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "role",
            type: "string",
          },
        ],
        internalType: "struct DataTypes.InputRoleToken[]",
        name: "assignRoles",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "entRole",
            type: "string",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
        ],
        internalType: "struct DataTypes.PostInput[]",
        name: "posts",
        type: "tuple[]",
      },
    ],
    name: "caseMakeOpen",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getRepoAddr",
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
    inputs: [],
    name: "hub",
    outputs: [
      {
        internalType: "contract IHub",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506111a6806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c8063365a86fc1461005c578063524111ab1461008057806395d277fe146100935780639e92fd8e146100a6578063dc1d9420146100ae575b600080fd5b6100646100c1565b6040516001600160a01b03909116815260200160405180910390f35b61006461008e366004610ddc565b6100d0565b6100646100a1366004610cf2565b6103f5565b610064610424565b6100646100bc366004610cf2565b610497565b60006100cb6105a2565b905090565b6000306001600160a01b031663dae4a17f33604080516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526009604482015268617574686f7269747960b81b606482015260840160206040518083038186803b15801561014057600080fd5b505afa158015610154573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101789190610cd2565b6101bf5760405162461bcd60e51b8152602060048201526013602482015272524f4c453a415554484f524954595f4f4e4c5960681b60448201526064015b60405180910390fd5b6000886001600160401b038111156101e757634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561022c57816020015b60408051808201909152600080825260208201528152602001906001900390816102055790505b50905060005b898110156102b95761024581600161110f565b82828151811061026557634e487b7160e01b600052603260045260246000fd5b60200260200101516000018181525050600182828151811061029757634e487b7160e01b600052603260045260246000fd5b6020908102919091018101519115159101526102b281611127565b9050610232565b5060006102c88f8f8f8f6105dd565b90506102d9818c8c8c8c8c8c610821565b806001600160a01b031663039bb6b26040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561031457600080fd5b505af1158015610328573d6000803e3d6000fd5b50505050806001600160a01b0316634cc906cb6040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561036757600080fd5b505af115801561037b573d6000803e3d6000fd5b5050604051635432c84560e01b81526001600160a01b0384169250635432c84591506103af90859089908990600401610f6d565b600060405180830381600087803b1580156103c957600080fd5b505af11580156103dd573d6000803e3d6000fd5b50929450505050509c9b505050505050505050505050565b6000806104048c8c8c8c6105dd565b905061041581898989898989610821565b9b9a5050505050505050505050565b6000306001600160a01b0316639e92fd8e6040518163ffffffff1660e01b815260040160206040518083038186803b15801561045f57600080fd5b505afa158015610473573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100cb9190610cb6565b60405163dae4a17f60e01b8152600090309063dae4a17f906104bd903390600401610f3b565b60206040518083038186803b1580156104d557600080fd5b505afa1580156104e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061050d9190610cd2565b6105295760405162461bcd60e51b81526004016101b690611000565b600061053d8c8c8c8c8c8c8c8c8c8c6103f5565b9050806001600160a01b031663039bb6b26040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561057a57600080fd5b505af115801561058e573d6000803e3d6000fd5b50929e9d5050505050505050505050505050565b6000306001600160a01b0316632db9a5126040518163ffffffff1660e01b815260040160206040518083038186803b15801561045f57600080fd5b60405163dae4a17f60e01b8152600090309063dae4a17f90610603903390600401610f3b565b60206040518083038186803b15801561061b57600080fd5b505afa15801561062f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106539190610cd2565b61066f5760405162461bcd60e51b81526004016101b690611000565b60006106796100c1565b6001600160a01b03166322bd5d53878787876040518563ffffffff1660e01b81526004016106aa9493929190611026565b602060405180830381600087803b1580156106c457600080fd5b505af11580156106d8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106fc9190610cb6565b905061070781610b39565b6001600160a01b03811663a80c616f33604080516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152600560448201526430b236b4b760d91b6064820152608401600060405180830381600087803b15801561077357600080fd5b505af1158015610787573d6000803e3d6000fd5b50505050806001600160a01b031663a80c616f6107a13390565b604080516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152600760448201526631b932b0ba37b960c91b6064820152608401600060405180830381600087803b1580156107ff57600080fd5b505af1158015610813573d6000803e3d6000fd5b509298975050505050505050565b60005b8381101561090f57876001600160a01b031663728b4b7786868481811061085b57634e487b7160e01b600052603260045260246000fd5b905060200281019061086d91906110db565b3587878581811061088e57634e487b7160e01b600052603260045260246000fd5b90506020028101906108a091906110db565b6108ae906020810190611097565b6040518463ffffffff1660e01b81526004016108cc93929190611074565b600060405180830381600087803b1580156108e657600080fd5b505af11580156108fa573d6000803e3d6000fd5b505050508061090890611127565b9050610824565b5060005b858110156109fe57876001600160a01b031663aa89f2cd88888481811061094a57634e487b7160e01b600052603260045260246000fd5b6109609260206040909202019081019150610c93565b89898581811061098057634e487b7160e01b600052603260045260246000fd5b905060400201602001356040518363ffffffff1660e01b81526004016109bb9291906001600160a01b03929092168252602082015260400190565b600060405180830381600087803b1580156109d557600080fd5b505af11580156109e9573d6000803e3d6000fd5b50505050806109f790611127565b9050610913565b5060005b81811015610b2f57876001600160a01b03166347f74172848484818110610a3957634e487b7160e01b600052603260045260246000fd5b9050602002810190610a4b91906110fa565b610a59906020810190611097565b868686818110610a7957634e487b7160e01b600052603260045260246000fd5b9050602002810190610a8b91906110fa565b35878787818110610aac57634e487b7160e01b600052603260045260246000fd5b9050602002810190610abe91906110fa565b610acc906040810190611097565b6040518663ffffffff1660e01b8152600401610aec959493929190610fd3565b600060405180830381600087803b158015610b0657600080fd5b505af1158015610b1a573d6000803e3d6000fd5b5050505080610b2890611127565b9050610a02565b5050505050505050565b610b41610bbf565b60408051633fba415560e21b815260048101919091526005604482015264636c61696d60d81b60648201526001600160a01b038381166024830152919091169063fee9055490608401600060405180830381600087803b158015610ba457600080fd5b505af1158015610bb8573d6000803e3d6000fd5b5050505050565b60006100cb610424565b60008083601f840112610bda578182fd5b5081356001600160401b03811115610bf0578182fd5b6020830191508360208260051b8501011115610c0b57600080fd5b9250929050565b60008083601f840112610c23578182fd5b5081356001600160401b03811115610c39578182fd5b6020830191508360208260061b8501011115610c0b57600080fd5b60008083601f840112610c65578182fd5b5081356001600160401b03811115610c7b578182fd5b602083019150836020828501011115610c0b57600080fd5b600060208284031215610ca4578081fd5b8135610caf81611158565b9392505050565b600060208284031215610cc7578081fd5b8151610caf81611158565b600060208284031215610ce3578081fd5b81518015158114610caf578182fd5b60008060008060008060008060008060a08b8d031215610d10578586fd5b8a356001600160401b0380821115610d26578788fd5b610d328e838f01610c54565b909c509a5060208d0135915080821115610d4a578788fd5b610d568e838f01610c54565b909a50985060408d0135915080821115610d6e578788fd5b610d7a8e838f01610c12565b909850965060608d0135915080821115610d92578586fd5b610d9e8e838f01610bc9565b909650945060808d0135915080821115610db6578384fd5b50610dc38d828e01610bc9565b915080935050809150509295989b9194979a5092959850565b60008060008060008060008060008060008060c08d8f031215610dfd578081fd5b6001600160401b038d351115610e11578081fd5b610e1e8e8e358f01610c54565b909c509a506001600160401b0360208e01351115610e3a578081fd5b610e4a8e60208f01358f01610c54565b909a5098506001600160401b0360408e01351115610e66578081fd5b610e768e60408f01358f01610c12565b90985096506001600160401b0360608e01351115610e92578081fd5b610ea28e60608f01358f01610bc9565b90965094506001600160401b0360808e01351115610ebe578081fd5b610ece8e60808f01358f01610bc9565b90945092506001600160401b0360a08e01351115610eea578081fd5b610efa8e60a08f01358f01610c54565b81935080925050509295989b509295989b509295989b565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6001600160a01b039190911681526040602082018190526006908201526536b2b6b132b960d11b606082015260800190565b60408082528451828201819052600091906020906060850190828901855b82811015610fb2578151805185528501511515858501529285019290840190600101610f8b565b50505084810382860152610fc7818789610f12565b98975050505050505050565b606081526000610fe7606083018789610f12565b8560208401528281036040840152610fc7818587610f12565b6020808252600c908201526b4d656d62657273204f6e6c7960a01b604082015260600190565b606081526005606082015264434c41494d60d81b608082015260a06020820152600061105660a083018688610f12565b8281036040840152611069818587610f12565b979650505050505050565b83815260406020820152600061108e604083018486610f12565b95945050505050565b6000808335601e198436030181126110ad578283fd5b8301803591506001600160401b038211156110c6578283fd5b602001915036819003821315610c0b57600080fd5b60008235603e198336030181126110f0578182fd5b9190910192915050565b60008235605e198336030181126110f0578182fd5b6000821982111561112257611122611142565b500190565b600060001982141561113b5761113b611142565b5060010190565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b038116811461116d57600080fd5b5056fea26469706673582212203999b46388a082e0ae8f47114db343438f0b3f64b37849282ae491f865d3cc6f64736f6c63430008040033";

type CourtExtConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CourtExtConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CourtExt__factory extends ContractFactory {
  constructor(...args: CourtExtConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "CourtExt";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CourtExt> {
    return super.deploy(overrides || {}) as Promise<CourtExt>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CourtExt {
    return super.attach(address) as CourtExt;
  }
  connect(signer: Signer): CourtExt__factory {
    return super.connect(signer) as CourtExt__factory;
  }
  static readonly contractName: "CourtExt";
  public readonly contractName: "CourtExt";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CourtExtInterface {
    return new utils.Interface(_abi) as CourtExtInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CourtExt {
    return new Contract(address, _abi, signerOrProvider) as CourtExt;
  }
}