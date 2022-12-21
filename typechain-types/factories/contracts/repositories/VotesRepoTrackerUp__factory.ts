/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  VotesRepoTrackerUp,
  VotesRepoTrackerUpInterface,
} from "../../../contracts/repositories/VotesRepoTrackerUp";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "fromDelegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "delegator",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "fromDelegate",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "toDelegate",
        type: "uint256",
      },
    ],
    name: "DelegateChangedToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "delegate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChangedToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "delegateBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "delegateFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "delegates",
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
        name: "sbt",
        type: "uint256",
      },
    ],
    name: "delegatesToken",
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
    inputs: [
      {
        internalType: "address",
        name: "contractAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "sbt",
        type: "uint256",
      },
    ],
    name: "delegatesTokenOf",
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
    name: "getCurrentSBT",
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
    name: "getHub",
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
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getPastTotalSupply",
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
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getPastVotes",
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
    inputs: [
      {
        internalType: "uint256",
        name: "sbt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getPastVotesForToken",
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
    inputs: [],
    name: "getTotalSupply",
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
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getVotes",
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
    inputs: [
      {
        internalType: "uint256",
        name: "sbt",
        type: "uint256",
      },
    ],
    name: "getVotesForToken",
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
    inputs: [
      {
        internalType: "address",
        name: "hub",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
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
    inputs: [
      {
        internalType: "uint256",
        name: "owner",
        type: "uint256",
      },
    ],
    name: "noncesForToken",
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
    name: "owner",
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
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "hubAddr",
        type: "address",
      },
    ],
    name: "setHub",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferVotingUnits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523060601b60805234801561001757600080fd5b5060805160601c6129446100526000396000818161060501528181610645015281816106e601528181610726015261079e01526129446000f3fe6080604052600436106101525760003560e01c806302cd1720146101575780630e7a5d161461018a5780632949582d1461019f5780632db9a512146101c157806331962cdc146101e35780633644e515146102035780633659cfe6146102185780633a46b1a8146102385780634f1ef2861461025857806352d1902d1461026b578063587cde1e1461028057806364d2fdb0146102a0578063715018a6146102c05780637a8639ed146102d55780637ecebe00146102f35780638abe564f146103135780638da5cb5b146103335780638e539e8c146103485780639ab24eb0146103685780639e92fd8e14610388578063a75558111461039d578063c1c5f41d146103bd578063c3cda520146103dd578063c4d66de8146103fd578063c4e41b221461041d578063d13684ea14610432578063e8a3d48514610452578063f0d3655d14610474578063f2fde38b14610494575b600080fd5b34801561016357600080fd5b5061017761017236600461259f565b6104b4565b6040519081526020015b60405180910390f35b34801561019657600080fd5b506101776104c6565b3480156101ab57600080fd5b506101bf6101ba3660046123af565b610550565b005b3480156101cd57600080fd5b506101d661056e565b604051610181919061261f565b3480156101ef57600080fd5b506101bf6101fe366004612377565b610582565b34801561020f57600080fd5b506101776105f0565b34801561022457600080fd5b506101bf610233366004612377565b6105fa565b34801561024457600080fd5b50610177610253366004612473565b6106c0565b6101bf6102663660046123e7565b6106db565b34801561027757600080fd5b50610177610791565b34801561028c57600080fd5b506101d661029b366004612377565b61083f565b3480156102ac57600080fd5b506101776102bb36600461259f565b610855565b3480156102cc57600080fd5b506101bf610876565b3480156102e157600080fd5b5060cb546001600160a01b03166101d6565b3480156102ff57600080fd5b5061017761030e366004612377565b61088a565b34801561031f57600080fd5b5061017761032e366004612377565b610894565b34801561033f57600080fd5b506101d661098f565b34801561035457600080fd5b5061017761036336600461259f565b610a0c565b34801561037457600080fd5b50610177610383366004612377565b610a77565b34801561039457600080fd5b506101d6610a85565b3480156103a957600080fd5b506101776103b8366004612473565b610aca565b3480156103c957600080fd5b506101776103d836600461259f565b610b05565b3480156103e957600080fd5b506101bf6103f836600461249e565b610b29565b34801561040957600080fd5b506101bf610418366004612377565b610c82565b34801561042957600080fd5b50610177610e2e565b34801561043e57600080fd5b5061017761044d3660046125b7565b610e47565b34801561045e57600080fd5b50610467610e6c565b6040516101819190612662565b34801561048057600080fd5b506101bf61048f3660046125d8565b610ef5565b3480156104a057600080fd5b506101bf6104af366004612377565b610f05565b60006104c03383610aca565b92915050565b60006104d0610f7b565b6001600160a01b031663724686d7336040518263ffffffff1660e01b81526004016104fb919061261f565b60206040518083038186803b15801561051357600080fd5b505afa158015610527573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054b919061251e565b905090565b61056a61055c83610fce565b61056583610fce565b6110d5565b5050565b600061054b6066546001600160a01b031690565b6066546001600160a01b0316336001600160a01b0316146105e45760405162461bcd60e51b8152602060048201526017602482015276242aa11d2aa720aaaa2427a924ad22a22fa1a0a62622a960491b60448201526064015b60405180910390fd5b6105ed816111a4565b50565b600061054b6112a2565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156106435760405162461bcd60e51b81526004016105db90612695565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661067561131d565b6001600160a01b03161461069b5760405162461bcd60e51b81526004016105db906126cf565b6106a481611339565b604080516000808252602082019092526105ed91839190611341565b60006106d46106ce84610894565b83610e47565b9392505050565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156107245760405162461bcd60e51b81526004016105db90612695565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661075661131d565b6001600160a01b03161461077c5760405162461bcd60e51b81526004016105db906126cf565b61078582611339565b61056a82826001611341565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461082c5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c6044820152771b1959081d1a1c9bdd59da0819195b1959d85d1958d85b1b60421b60648201526084016105db565b506000805160206128a883398151915290565b60006104c061085061017284610894565b6114bb565b336000908152610104602090815260408083208484529091528120546104c0565b61087e611538565b6108886000611597565b565b60006104c06102bb835b60cb546000906001600160a01b03838116911614156109155760405162461bcd60e51b815260206004820152603760248201527f547261636b65723a20736f7572636520636f6e74726163742061646472657373604482015276081a5cc81b9bdd0818481d985b1a59081858d8dbdd5b9d604a1b60648201526084016105db565b600061092083610fce565b9050806104c05760405162461bcd60e51b815260206004820152603760248201527f547261636b65723a20726571756573746564206163636f756e74206e6f7420666044820152761bdd5b99081bdb881cdbdd5c98d94818dbdb9d1c9858dd604a1b60648201526084016105db565b60665460408051638da5cb5b60e01b815290516000926001600160a01b031691638da5cb5b916004808301926020929190829003018186803b1580156109d457600080fd5b505afa1580156109e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054b9190612393565b6000438210610a5d5760405162461bcd60e51b815260206004820152601e60248201527f566f7465735265706f3a20626c6f636b206e6f7420796574206d696e6564000060448201526064016105db565b336000908152610103602052604090206104c090836115e9565b60006104c06103d883610fce565b60665460408051634f497ec760e11b815290516000926001600160a01b031691639e92fd8e916004808301926020929190829003018186803b1580156109d457600080fd5b6001600160a01b0382166000908152610101602090815260408083208484529091528120548015610afb5780610afd565b825b949350505050565b3360009081526101026020908152604080832084845290915281206104c090611713565b83421115610b785760405162461bcd60e51b815260206004820152601c60248201527b159bdd195cd4995c1bce881cda59db985d1d5c9948195e1c1a5c995960221b60448201526064016105db565b604080517fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf60208201526001600160a01b038816918101919091526060810186905260808101859052600090610bf290610bea9060a0016040516020818303038152906040528051906020012061177c565b8585856117ca565b9050610c26610c0082610894565b336000908152610104602090815260408083209383529290522080546001810190915590565b8614610c6f5760405162461bcd60e51b8152602060048201526018602482015277566f7465735265706f3a20696e76616c6964206e6f6e636560401b60448201526064016105db565b610c798188610550565b50505050505050565b600154610100900460ff1615808015610c9f57506001805460ff16105b80610cbf5750610cae306117f2565b158015610cbf57506001805460ff16145b610d225760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016105db565b6001805460ff1916811790558015610d44576001805461ff0019166101001790555b610d4c611801565b610d5582611828565b610de6610d6061184f565b60665460405163e2b49cb960e01b81526001600160a01b039283169263e2b49cb992610d9192911690600401612633565b60206040518083038186803b158015610da957600080fd5b505afa158015610dbd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de19190612393565b611859565b801561056a576001805461ff00191681556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b3360009081526101036020526040812061054b90611713565b3360009081526101026020908152604080832085845290915281206106d490836115e9565b6060610e76610f7b565b6001600160a01b03166333dfa7d5306040518263ffffffff1660e01b8152600401610ea1919061261f565b60006040518083038186803b158015610eb957600080fd5b505afa158015610ecd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261054b9190810190612536565b610f00838383611957565b505050565b610f0d611538565b6001600160a01b038116610f725760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016105db565b6105ed81611597565b6000610f8561184f565b60665460405163e2b49cb960e01b81526001600160a01b039283169263e2b49cb992610fb692911690600401612633565b60206040518083038186803b1580156109d457600080fd5b60cb546000906001600160a01b03838116911614156110555760405162461bcd60e51b815260206004820152603e60248201527f45524331313535547261636b65723a20736f7572636520636f6e74726163742060448201527f61646472657373206973206e6f7420612076616c6964206163636f756e74000060648201526084016105db565b60cb5460405163724686d760e01b81526001600160a01b039091169063724686d79061108590859060040161261f565b60206040518083038186803b15801561109d57600080fd5b505afa1580156110b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c0919061251e565b60006110e0836104b4565b3360009081526101016020908152604080832087845290915290208390559050611109826114bb565b6001600160a01b031661111b826114bb565b6001600160a01b031661112d856114bb565b6001600160a01b03167f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f60405160405180910390a48181847f472d85e9261660ff5a5db6fb50351852ec3312ceeb7eb55cf99286fb54c29a1b60405160405180910390a4610f00818361119f86611a1a565b611a3e565b61123d816001600160a01b03166310055c1d6040518163ffffffff1660e01b815260040160006040518083038186803b1580156111e057600080fd5b505afa1580156111f4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261121c9190810190612536565b60405180604001604052806003815260200162243ab160e91b815250611b9b565b6112805760405162461bcd60e51b8152602060048201526014602482015273125b9d985b1a5908121d588810dbdb9d1c9858dd60621b60448201526064016105db565b606680546001600160a01b0319166001600160a01b0392909216919091179055565b600061054b7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6112d160cc5490565b60cd546040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b6000805160206128a8833981519152546001600160a01b031690565b6105ed611538565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff161561137457610f0083611bf4565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b815260040160206040518083038186803b1580156113ad57600080fd5b505afa9250505080156113dd575060408051601f3d908101601f191682019092526113da9181019061251e565b60015b6114405760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b60648201526084016105db565b6000805160206128a883398151915281146114af5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b60648201526084016105db565b50610f00838383611c8e565b60cb546040516331a9108f60e11b8152600481018390526000916001600160a01b031690636352211e9060240160206040518083038186803b15801561150057600080fd5b505afa158015611514573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c09190612393565b3361154161098f565b6001600160a01b0316146108885760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105db565b603480546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600043821061163a5760405162461bcd60e51b815260206004820181905260248201527f436865636b706f696e74733a20626c6f636b206e6f7420796574206d696e656460448201526064016105db565b825460005b818110156116ad5760006116538284611cb9565b90508486600001828154811061167957634e487b7160e01b600052603260045260246000fd5b60009182526020909120015463ffffffff161115611699578092506116a7565b6116a48160016127ab565b91505b5061163f565b81156116fe57846116bf6001846127e3565b815481106116dd57634e487b7160e01b600052603260045260246000fd5b600091825260209091200154600160201b90046001600160e01b0316611701565b60005b6001600160e01b031695945050505050565b80546000908015611769578261172a6001836127e3565b8154811061174857634e487b7160e01b600052603260045260246000fd5b600091825260209091200154600160201b90046001600160e01b031661176c565b60005b6001600160e01b03169392505050565b60006104c06117896112a2565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b60008060006117db87878787611cd4565b915091506117e881611db7565b5095945050505050565b6001600160a01b03163b151590565b600154610100900460ff166108885760405162461bcd60e51b81526004016105db90612709565b600154610100900460ff166105e45760405162461bcd60e51b81526004016105db90612709565b600061054b610a85565b6040516301ffc9a760e01b81526317ff47d760e21b60048201526001600160a01b038216906301ffc9a79060240160206040518083038186803b15801561189f57600080fd5b505afa1580156118b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118d791906124fe565b6119355760405162461bcd60e51b815260206004820152602960248201527f54617267657420636f6e747261637420657870656374656420746f20737570706044820152681bdc9d081254dbdd5b60ba1b60648201526084016105db565b60cb80546001600160a01b0319166001600160a01b0392909216919091179055565b82611980573360009081526101036020526040902061197990611fb383611fbf565b50506119ab565b3360009081526101006020908152604080832086845290915290206119a890611fed83611fbf565b50505b816119d457336000908152610103602052604090206119cd90611fed83611fbf565b50506119ff565b3360009081526101006020908152604080832085845290915290206119fc90611fb383611fbf565b50505b610f00611a0b846104b4565b611a14846104b4565b83611a3e565b3360009081526101006020908152604080832084845290915281206104c090611713565b818314158015611a4e5750600081115b15610f00578215611af5573360009081526101026020908152604080832086845290915281208190611a8390611fed85611fbf565b91509150611a90856114bb565b6001600160a01b03166000805160206128ef8339815191528383604051611ac1929190918252602082015260400190565b60405180910390a260408051838152602081018390528691600080516020612868833981519152910160405180910390a250505b8115610f00573360009081526101026020908152604080832085845290915281208190611b2590611fb385611fbf565b91509150611b32846114bb565b6001600160a01b03166000805160206128ef8339815191528383604051611b63929190918252602082015260400190565b60405180910390a260408051838152602081018390528591600080516020612868833981519152910160405180910390a25050505050565b600081604051602001611bae9190612603565b6040516020818303038152906040528051906020012083604051602001611bd59190612603565b6040516020818303038152906040528051906020012014905092915050565b611bfd816117f2565b611c5f5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016105db565b6000805160206128a883398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b611c9783611ff9565b600082511180611ca45750805b15610f0057611cb38383612039565b50505050565b6000611cc860028484186127c3565b6106d4908484166127ab565b6000806fa2a8918ca85bafe22016d0b997e4df60600160ff1b03831115611d015750600090506003611dae565b8460ff16601b14158015611d1957508460ff16601c14155b15611d2a5750600090506004611dae565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611d7e573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611da757600060019250925050611dae565b9150600090505b94509492505050565b6000816004811115611dd957634e487b7160e01b600052602160045260246000fd5b1415611de25750565b6001816004811115611e0457634e487b7160e01b600052602160045260246000fd5b1415611e4d5760405162461bcd60e51b815260206004820152601860248201527745434453413a20696e76616c6964207369676e617475726560401b60448201526064016105db565b6002816004811115611e6f57634e487b7160e01b600052602160045260246000fd5b1415611ebd5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016105db565b6003816004811115611edf57634e487b7160e01b600052602160045260246000fd5b1415611f385760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016105db565b6004816004811115611f5a57634e487b7160e01b600052602160045260246000fd5b14156105ed5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016105db565b60006106d482846127ab565b600080611fe185611fdc611fd288611713565b868863ffffffff16565b61212b565b91509150935093915050565b60006106d482846127e3565b61200281611bf4565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060612044836117f2565b61209f5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016105db565b600080846001600160a01b0316846040516120ba9190612603565b600060405180830381855af49150503d80600081146120f5576040519150601f19603f3d011682016040523d82523d6000602084013e6120fa565b606091505b509150915061212282826040518060600160405280602781526020016128c86027913961226c565b95945050505050565b815460009081908161213c86611713565b9050600082118015612188575043866121566001856127e3565b8154811061217457634e487b7160e01b600052603260045260246000fd5b60009182526020909120015463ffffffff16145b156121f657612196856122a5565b866121a26001856127e3565b815481106121c057634e487b7160e01b600052603260045260246000fd5b9060005260206000200160000160046101000a8154816001600160e01b0302191690836001600160e01b03160217905550612263565b85600001604051806040016040528061220e43612312565b63ffffffff168152602001612222886122a5565b6001600160e01b039081169091528254600181018455600093845260209384902083519490930151909116600160201b0263ffffffff909316929092179101555b95939450505050565b6060831561227b5750816106d4565b82511561228b5782518084602001fd5b8160405162461bcd60e51b81526004016105db9190612662565b60006001600160e01b0382111561230e5760405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e20326044820152663234206269747360c81b60648201526084016105db565b5090565b600063ffffffff82111561230e5760405162461bcd60e51b815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201526532206269747360d01b60648201526084016105db565b600060208284031215612388578081fd5b81356106d481612852565b6000602082840312156123a4578081fd5b81516106d481612852565b600080604083850312156123c1578081fd5b82356123cc81612852565b915060208301356123dc81612852565b809150509250929050565b600080604083850312156123f9578182fd5b823561240481612852565b915060208301356001600160401b0381111561241e578182fd5b8301601f8101851361242e578182fd5b803561244161243c82612784565b612754565b818152866020838501011115612455578384fd5b81602084016020830137908101602001929092525090939092509050565b60008060408385031215612485578182fd5b823561249081612852565b946020939093013593505050565b60008060008060008060c087890312156124b6578182fd5b86356124c181612852565b95506020870135945060408701359350606087013560ff811681146124e4578283fd5b9598949750929560808101359460a0909101359350915050565b60006020828403121561250f578081fd5b815180151581146106d4578182fd5b60006020828403121561252f578081fd5b5051919050565b600060208284031215612547578081fd5b81516001600160401b0381111561255c578182fd5b8201601f8101841361256c578182fd5b805161257a61243c82612784565b81815285602083850101111561258e578384fd5b6121228260208301602086016127fa565b6000602082840312156125b0578081fd5b5035919050565b600080604083850312156125c9578182fd5b50508035926020909101359150565b6000806000606084860312156125ec578283fd5b505081359360208301359350604090920135919050565b600082516126158184602087016127fa565b9190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b039190911681526040602082018190526003908201526214d09560ea1b606082015260800190565b60208152600082518060208401526126818160408501602087016127fa565b601f01601f19169190910160400192915050565b6020808252602c9082015260008051602061288883398151915260408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c9082015260008051602061288883398151915260408201526b6163746976652070726f787960a01b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b604051601f8201601f191681016001600160401b038111828210171561277c5761277c61283c565b604052919050565b60006001600160401b0382111561279d5761279d61283c565b50601f01601f191660200190565b600082198211156127be576127be612826565b500190565b6000826127de57634e487b7160e01b81526012600452602481fd5b500490565b6000828210156127f5576127f5612826565b500390565b60005b838110156128155781810151838201526020016127fd565b83811115611cb35750506000910152565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146105ed57600080fdfe83da1ccbbd17813255d2273857938d1a72aaa4d1ba08e5effec611a940dd996246756e6374696f6e206d7573742062652063616c6c6564207468726f75676820360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564dec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724a2646970667358221220242f9bea08b11c0b99bd6ac759e4d1afee5e894db71980eb7b186b1dad87332d64736f6c63430008040033";

type VotesRepoTrackerUpConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VotesRepoTrackerUpConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VotesRepoTrackerUp__factory extends ContractFactory {
  constructor(...args: VotesRepoTrackerUpConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<VotesRepoTrackerUp> {
    return super.deploy(overrides || {}) as Promise<VotesRepoTrackerUp>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): VotesRepoTrackerUp {
    return super.attach(address) as VotesRepoTrackerUp;
  }
  override connect(signer: Signer): VotesRepoTrackerUp__factory {
    return super.connect(signer) as VotesRepoTrackerUp__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VotesRepoTrackerUpInterface {
    return new utils.Interface(_abi) as VotesRepoTrackerUpInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VotesRepoTrackerUp {
    return new Contract(address, _abi, signerOrProvider) as VotesRepoTrackerUp;
  }
}