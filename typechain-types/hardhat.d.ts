/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "IVotesUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVotesUpgradeable__factory>;
    getContractFactory(
      name: "IERC1822ProxiableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1822ProxiableUpgradeable__factory>;
    getContractFactory(
      name: "IERC1967Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1967Upgradeable__factory>;
    getContractFactory(
      name: "IBeaconUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeaconUpgradeable__factory>;
    getContractFactory(
      name: "ERC1967UpgradeUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967UpgradeUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "UUPSUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UUPSUpgradeable__factory>;
    getContractFactory(
      name: "IERC1155ReceiverUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155ReceiverUpgradeable__factory>;
    getContractFactory(
      name: "IERC1155Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Upgradeable__factory>;
    getContractFactory(
      name: "ERC721Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Upgradeable__factory>;
    getContractFactory(
      name: "ERC721URIStorageUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721URIStorageUpgradeable__factory>;
    getContractFactory(
      name: "IERC721MetadataUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721MetadataUpgradeable__factory>;
    getContractFactory(
      name: "IERC721ReceiverUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721ReceiverUpgradeable__factory>;
    getContractFactory(
      name: "IERC721Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Upgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "EIP712Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP712Upgradeable__factory>;
    getContractFactory(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: "AccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>;
    getContractFactory(
      name: "IAccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControl__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IERC1822Proxiable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1822Proxiable__factory>;
    getContractFactory(
      name: "IERC1967",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1967__factory>;
    getContractFactory(
      name: "BeaconProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BeaconProxy__factory>;
    getContractFactory(
      name: "IBeacon",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeacon__factory>;
    getContractFactory(
      name: "UpgradeableBeacon",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UpgradeableBeacon__factory>;
    getContractFactory(
      name: "ERC1967Upgrade",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967Upgrade__factory>;
    getContractFactory(
      name: "Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Proxy__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Permit__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "ContractBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContractBase__factory>;
    getContractFactory(
      name: "CTXEntityUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CTXEntityUpgradable__factory>;
    getContractFactory(
      name: "ERC1155GUIDTrackerUp",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155GUIDTrackerUp__factory>;
    getContractFactory(
      name: "ERC1155RolesTrackerUp",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155RolesTrackerUp__factory>;
    getContractFactory(
      name: "ERC1155TrackerUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155TrackerUpgradable__factory>;
    getContractFactory(
      name: "ERC1155TrackerUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155TrackerUpgradable__factory>;
    getContractFactory(
      name: "ERC721TrackerUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721TrackerUpgradable__factory>;
    getContractFactory(
      name: "Escrow",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Escrow__factory>;
    getContractFactory(
      name: "GameExtension",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameExtension__factory>;
    getContractFactory(
      name: "Multicall",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Multicall__factory>;
    getContractFactory(
      name: "Opinions",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Opinions__factory>;
    getContractFactory(
      name: "Posts",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Posts__factory>;
    getContractFactory(
      name: "Procedure",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Procedure__factory>;
    getContractFactory(
      name: "ProtocolEntity",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ProtocolEntity__factory>;
    getContractFactory(
      name: "ProtocolEntityUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ProtocolEntityUpgradable__factory>;
    getContractFactory(
      name: "Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Proxy__factory>;
    getContractFactory(
      name: "ProxyMulti",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ProxyMulti__factory>;
    getContractFactory(
      name: "Recursion",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Recursion__factory>;
    getContractFactory(
      name: "Rules",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Rules__factory>;
    getContractFactory(
      name: "SoulBonds",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SoulBonds__factory>;
    getContractFactory(
      name: "Tracker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Tracker__factory>;
    getContractFactory(
      name: "VotesTracker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VotesTracker__factory>;
    getContractFactory(
      name: "VotesUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VotesUpgradeable__factory>;
    getContractFactory(
      name: "ActionRepoTrackerUp",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ActionRepoTrackerUp__factory>;
    getContractFactory(
      name: "ClaimUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ClaimUpgradable__factory>;
    getContractFactory(
      name: "ActionExt",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ActionExt__factory>;
    getContractFactory(
      name: "CourtExt",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CourtExt__factory>;
    getContractFactory(
      name: "FundManExt",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FundManExt__factory>;
    getContractFactory(
      name: "ICourtExt",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICourtExt__factory>;
    getContractFactory(
      name: "IRuleExt",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRuleExt__factory>;
    getContractFactory(
      name: "MicroDAOExt",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MicroDAOExt__factory>;
    getContractFactory(
      name: "ProjectExt",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ProjectExt__factory>;
    getContractFactory(
      name: "RuleExt",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RuleExt__factory>;
    getContractFactory(
      name: "VotesExt",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VotesExt__factory>;
    getContractFactory(
      name: "GameUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GameUpgradable__factory>;
    getContractFactory(
      name: "HubUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HubUpgradable__factory>;
    getContractFactory(
      name: "IActionRepo",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IActionRepo__factory>;
    getContractFactory(
      name: "IAssocRepo",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAssocRepo__factory>;
    getContractFactory(
      name: "IClaim",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IClaim__factory>;
    getContractFactory(
      name: "IContractBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IContractBase__factory>;
    getContractFactory(
      name: "ICTXEntityUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICTXEntityUpgradable__factory>;
    getContractFactory(
      name: "IERC1155GUIDTracker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155GUIDTracker__factory>;
    getContractFactory(
      name: "IERC1155RolesTracker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155RolesTracker__factory>;
    getContractFactory(
      name: "IERC1155Tracker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Tracker__factory>;
    getContractFactory(
      name: "IERC1155Tracker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Tracker__factory>;
    getContractFactory(
      name: "IERC721Tracker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Tracker__factory>;
    getContractFactory(
      name: "IGame",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGame__factory>;
    getContractFactory(
      name: "IHub",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IHub__factory>;
    getContractFactory(
      name: "IMulticall",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IMulticall__factory>;
    getContractFactory(
      name: "IOpinions",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOpinions__factory>;
    getContractFactory(
      name: "IPosts",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPosts__factory>;
    getContractFactory(
      name: "IProcedure",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IProcedure__factory>;
    getContractFactory(
      name: "IProtocolEntity",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IProtocolEntity__factory>;
    getContractFactory(
      name: "IRecursion",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRecursion__factory>;
    getContractFactory(
      name: "IRules",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRules__factory>;
    getContractFactory(
      name: "IRulesRepo",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRulesRepo__factory>;
    getContractFactory(
      name: "ISoul",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISoul__factory>;
    getContractFactory(
      name: "ISoulBonds",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISoulBonds__factory>;
    getContractFactory(
      name: "ITask",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ITask__factory>;
    getContractFactory(
      name: "IVotesUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVotesUpgradeable__factory>;
    getContractFactory(
      name: "IToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IToken__factory>;
    getContractFactory(
      name: "ClaimMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ClaimMock__factory>;
    getContractFactory(
      name: "Dummy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Dummy__factory>;
    getContractFactory(
      name: "Dummy2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Dummy2__factory>;
    getContractFactory(
      name: "HubMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HubMock__factory>;
    getContractFactory(
      name: "InfoToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.InfoToken__factory>;
    getContractFactory(
      name: "Token",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Token__factory>;
    getContractFactory(
      name: "AssocRepo",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AssocRepo__factory>;
    getContractFactory(
      name: "IBoolStore",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBoolStore__factory>;
    getContractFactory(
      name: "IOpenRepo",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOpenRepo__factory>;
    getContractFactory(
      name: "IStringStore",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStringStore__factory>;
    getContractFactory(
      name: "IVotesRepoTracker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVotesRepoTracker__factory>;
    getContractFactory(
      name: "IVotesRepoTracker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVotesRepoTracker__factory>;
    getContractFactory(
      name: "IVotesRoleRepoTracker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVotesRoleRepoTracker__factory>;
    getContractFactory(
      name: "IVotesUpgradeableInt",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVotesUpgradeableInt__factory>;
    getContractFactory(
      name: "OpenRepoUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OpenRepoUpgradable__factory>;
    getContractFactory(
      name: "RuleRepo",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RuleRepo__factory>;
    getContractFactory(
      name: "VotesRepoTrackerUpInt",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VotesRepoTrackerUpInt__factory>;
    getContractFactory(
      name: "VotesRepoTrackerUp",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VotesRepoTrackerUp__factory>;
    getContractFactory(
      name: "VotesRoleRepoTrackerUp",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VotesRoleRepoTrackerUp__factory>;
    getContractFactory(
      name: "SafeERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SafeERC1155__factory>;
    getContractFactory(
      name: "SafeERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SafeERC721__factory>;
    getContractFactory(
      name: "SoulUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SoulUpgradable__factory>;
    getContractFactory(
      name: "TaskUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TaskUpgradable__factory>;

    getContractAt(
      name: "OwnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "IVotesUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IVotesUpgradeable>;
    getContractAt(
      name: "IERC1822ProxiableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1822ProxiableUpgradeable>;
    getContractAt(
      name: "IERC1967Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1967Upgradeable>;
    getContractAt(
      name: "IBeaconUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBeaconUpgradeable>;
    getContractAt(
      name: "ERC1967UpgradeUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967UpgradeUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "UUPSUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UUPSUpgradeable>;
    getContractAt(
      name: "IERC1155ReceiverUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155ReceiverUpgradeable>;
    getContractAt(
      name: "IERC1155Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Upgradeable>;
    getContractAt(
      name: "ERC721Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Upgradeable>;
    getContractAt(
      name: "ERC721URIStorageUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721URIStorageUpgradeable>;
    getContractAt(
      name: "IERC721MetadataUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721MetadataUpgradeable>;
    getContractAt(
      name: "IERC721ReceiverUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721ReceiverUpgradeable>;
    getContractAt(
      name: "IERC721Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Upgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "EIP712Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP712Upgradeable>;
    getContractAt(
      name: "ERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165Upgradeable>;
    getContractAt(
      name: "IERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165Upgradeable>;
    getContractAt(
      name: "AccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControl>;
    getContractAt(
      name: "IAccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControl>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IERC1822Proxiable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1822Proxiable>;
    getContractAt(
      name: "IERC1967",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1967>;
    getContractAt(
      name: "BeaconProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BeaconProxy>;
    getContractAt(
      name: "IBeacon",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBeacon>;
    getContractAt(
      name: "UpgradeableBeacon",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UpgradeableBeacon>;
    getContractAt(
      name: "ERC1967Upgrade",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967Upgrade>;
    getContractAt(
      name: "Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Proxy>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Permit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Permit>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "ContractBase",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContractBase>;
    getContractAt(
      name: "CTXEntityUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CTXEntityUpgradable>;
    getContractAt(
      name: "ERC1155GUIDTrackerUp",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155GUIDTrackerUp>;
    getContractAt(
      name: "ERC1155RolesTrackerUp",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155RolesTrackerUp>;
    getContractAt(
      name: "ERC1155TrackerUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155TrackerUpgradable>;
    getContractAt(
      name: "ERC1155TrackerUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155TrackerUpgradable>;
    getContractAt(
      name: "ERC721TrackerUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721TrackerUpgradable>;
    getContractAt(
      name: "Escrow",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Escrow>;
    getContractAt(
      name: "GameExtension",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameExtension>;
    getContractAt(
      name: "Multicall",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Multicall>;
    getContractAt(
      name: "Opinions",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Opinions>;
    getContractAt(
      name: "Posts",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Posts>;
    getContractAt(
      name: "Procedure",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Procedure>;
    getContractAt(
      name: "ProtocolEntity",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ProtocolEntity>;
    getContractAt(
      name: "ProtocolEntityUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ProtocolEntityUpgradable>;
    getContractAt(
      name: "Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Proxy>;
    getContractAt(
      name: "ProxyMulti",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ProxyMulti>;
    getContractAt(
      name: "Recursion",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Recursion>;
    getContractAt(
      name: "Rules",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Rules>;
    getContractAt(
      name: "SoulBonds",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SoulBonds>;
    getContractAt(
      name: "Tracker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Tracker>;
    getContractAt(
      name: "VotesTracker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VotesTracker>;
    getContractAt(
      name: "VotesUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VotesUpgradeable>;
    getContractAt(
      name: "ActionRepoTrackerUp",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ActionRepoTrackerUp>;
    getContractAt(
      name: "ClaimUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ClaimUpgradable>;
    getContractAt(
      name: "ActionExt",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ActionExt>;
    getContractAt(
      name: "CourtExt",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CourtExt>;
    getContractAt(
      name: "FundManExt",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FundManExt>;
    getContractAt(
      name: "ICourtExt",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICourtExt>;
    getContractAt(
      name: "IRuleExt",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRuleExt>;
    getContractAt(
      name: "MicroDAOExt",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MicroDAOExt>;
    getContractAt(
      name: "ProjectExt",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ProjectExt>;
    getContractAt(
      name: "RuleExt",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RuleExt>;
    getContractAt(
      name: "VotesExt",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VotesExt>;
    getContractAt(
      name: "GameUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GameUpgradable>;
    getContractAt(
      name: "HubUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HubUpgradable>;
    getContractAt(
      name: "IActionRepo",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IActionRepo>;
    getContractAt(
      name: "IAssocRepo",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAssocRepo>;
    getContractAt(
      name: "IClaim",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IClaim>;
    getContractAt(
      name: "IContractBase",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IContractBase>;
    getContractAt(
      name: "ICTXEntityUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICTXEntityUpgradable>;
    getContractAt(
      name: "IERC1155GUIDTracker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155GUIDTracker>;
    getContractAt(
      name: "IERC1155RolesTracker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155RolesTracker>;
    getContractAt(
      name: "IERC1155Tracker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Tracker>;
    getContractAt(
      name: "IERC1155Tracker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Tracker>;
    getContractAt(
      name: "IERC721Tracker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Tracker>;
    getContractAt(
      name: "IGame",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGame>;
    getContractAt(
      name: "IHub",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IHub>;
    getContractAt(
      name: "IMulticall",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IMulticall>;
    getContractAt(
      name: "IOpinions",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOpinions>;
    getContractAt(
      name: "IPosts",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPosts>;
    getContractAt(
      name: "IProcedure",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IProcedure>;
    getContractAt(
      name: "IProtocolEntity",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IProtocolEntity>;
    getContractAt(
      name: "IRecursion",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRecursion>;
    getContractAt(
      name: "IRules",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRules>;
    getContractAt(
      name: "IRulesRepo",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRulesRepo>;
    getContractAt(
      name: "ISoul",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISoul>;
    getContractAt(
      name: "ISoulBonds",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISoulBonds>;
    getContractAt(
      name: "ITask",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ITask>;
    getContractAt(
      name: "IVotesUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IVotesUpgradeable>;
    getContractAt(
      name: "IToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IToken>;
    getContractAt(
      name: "ClaimMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ClaimMock>;
    getContractAt(
      name: "Dummy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Dummy>;
    getContractAt(
      name: "Dummy2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Dummy2>;
    getContractAt(
      name: "HubMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HubMock>;
    getContractAt(
      name: "InfoToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.InfoToken>;
    getContractAt(
      name: "Token",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Token>;
    getContractAt(
      name: "AssocRepo",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AssocRepo>;
    getContractAt(
      name: "IBoolStore",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBoolStore>;
    getContractAt(
      name: "IOpenRepo",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOpenRepo>;
    getContractAt(
      name: "IStringStore",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStringStore>;
    getContractAt(
      name: "IVotesRepoTracker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IVotesRepoTracker>;
    getContractAt(
      name: "IVotesRepoTracker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IVotesRepoTracker>;
    getContractAt(
      name: "IVotesRoleRepoTracker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IVotesRoleRepoTracker>;
    getContractAt(
      name: "IVotesUpgradeableInt",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IVotesUpgradeableInt>;
    getContractAt(
      name: "OpenRepoUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OpenRepoUpgradable>;
    getContractAt(
      name: "RuleRepo",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RuleRepo>;
    getContractAt(
      name: "VotesRepoTrackerUpInt",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VotesRepoTrackerUpInt>;
    getContractAt(
      name: "VotesRepoTrackerUp",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VotesRepoTrackerUp>;
    getContractAt(
      name: "VotesRoleRepoTrackerUp",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VotesRoleRepoTrackerUp>;
    getContractAt(
      name: "SafeERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SafeERC1155>;
    getContractAt(
      name: "SafeERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SafeERC721>;
    getContractAt(
      name: "SoulUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SoulUpgradable>;
    getContractAt(
      name: "TaskUpgradable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TaskUpgradable>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
